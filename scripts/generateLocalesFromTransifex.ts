// @ts-expect-error no type definitions for this lib
import { transifexApi } from '@transifex/api'
import axios from 'axios'
import { promises as fsPromises } from 'fs'
import path from 'path'
import * as readline from 'readline'
import { promisify } from 'util'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
// eslint-disable-next-line @typescript-eslint/unbound-method
const question = promisify(rl.question).bind(rl)

const organizationSlug = 'foray1010'
const projectSlug = 'popup-my-bookmarks'
const resourceSlug = 'messagesjson-1'

const localesPath = path.join('src', 'core', '_locales')

interface Messages {
  [key: string]: {
    message: string
    description?: string
  }
}

async function main(): Promise<void> {
  // @ts-expect-error somehow promisify does not work correctly with readline.question
  const transifexApiKey: string = await question(
    'transifex api key (get from https://www.transifex.com/user/settings/api/): ',
  )
  if (!transifexApiKey) throw new Error('transifexApiKey is required')

  transifexApi.setup({ auth: transifexApiKey })

  const organization = await transifexApi.Organization.get({
    slug: organizationSlug,
  })
  const projects = await organization.fetch('projects')
  const project = await projects.get({ slug: projectSlug })

  const resources = await project.fetch('resources')
  const resource = await resources.get({ slug: resourceSlug })

  const languages = await project.fetch('languages')
  await languages.fetch()

  await Promise.all(
    languages.data.map(async (language: any) => {
      let mappedLanguage: string
      switch (language.attributes.code) {
        case 'nb_NO':
          mappedLanguage = 'nb'
          break

        case 'es_ES':
          mappedLanguage = 'es'
          break

        default:
          mappedLanguage = language.attributes.code
      }

      console.log(`processing "${mappedLanguage}"...`)

      const url = await transifexApi.ResourceTranslationsAsyncDownload.download(
        {
          resource,
          language,
          mode: 'onlytranslated',
        },
      )
      const response = await axios.get(url)

      const messagesJson: Messages = response.data

      const sortedMessagesJson = Object.fromEntries(
        Object.entries(messagesJson)
          .map(([k, v]) => {
            const trimmedMessage = v.message.trim()
            if (!trimmedMessage) return undefined

            return [k, { ...v, message: trimmedMessage }] as const
          })
          .filter(<T>(x: T | undefined): x is T => x !== undefined)
          .sort(([a], [b]) => a.localeCompare(b)),
      )

      await fsPromises.mkdir(path.join(localesPath, mappedLanguage), {
        recursive: true,
      })

      await fsPromises.writeFile(
        path.join(localesPath, mappedLanguage, 'messages.json'),
        JSON.stringify(sortedMessagesJson, null, 2) + '\n',
      )

      console.log(`"${mappedLanguage}" is generated`)
    }),
  )
}

main()
  .then(() => {
    rl.close()
  })
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
