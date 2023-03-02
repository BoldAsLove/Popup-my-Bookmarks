/* eslint-disable
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-member-access,
*/
import type * as React from 'react'
import webExtension from 'webextension-polyfill'

import type { OptionConfig } from '../../../../core/types/options.js'
import InputNumber from './InputNumber/index.js'
import InputSelect from './InputSelect/index.js'
import SelectButton from './SelectButton/index.js'
import SelectMultiple from './SelectMultiple/index.js'
import SelectString from './SelectString/index.js'

interface Props<T = any> {
  readonly name: string
  readonly optionConfig: OptionConfig
  readonly onBlur: (event?: React.FocusEvent) => void
  readonly onChange: (eventOrValue: React.ChangeEvent | T) => void
  readonly value: T
}

export default function OptionItem({ optionConfig, ...inputProps }: Props) {
  const { onBlur, onChange, value } = inputProps

  switch (optionConfig.type) {
    case 'array':
      return (
        <SelectMultiple
          {...inputProps}
          choices={optionConfig.choices}
          onChange={(evt) => {
            const checkboxValue = Number.parseInt(evt.currentTarget.value, 10)

            const newValue = evt.currentTarget.checked
              ? [checkboxValue, ...value].sort()
              : value.filter((x: number) => x !== checkboxValue)
            onChange(newValue)
          }}
        />
      )

    case 'boolean':
      return (
        <SelectButton
          {...inputProps}
          choices={[
            {
              label: webExtension.i18n.getMessage('yes'),
              value: 'true',
            },
            {
              label: webExtension.i18n.getMessage('no'),
              value: 'false',
            },
          ]}
          value={value === true ? 'true' : 'false'}
          onChange={(evt) => {
            onChange(evt.currentTarget.value === 'true')
          }}
        />
      )

    case 'integer':
      return (
        <InputNumber
          {...inputProps}
          maximum={optionConfig.maximum}
          minimum={optionConfig.minimum}
          onChange={(evt) => {
            const newValue = Number.parseInt(evt.currentTarget.value, 10)
            onChange(!Number.isNaN(newValue) ? newValue : '')
          }}
        />
      )

    case 'select':
      return (
        <SelectString
          {...inputProps}
          choices={optionConfig.choices}
          onChange={(evt) => {
            onChange(Number.parseInt(evt.currentTarget.value, 10))
          }}
        />
      )

    case 'string':
      return (
        <InputSelect
          {...inputProps}
          choices={optionConfig.choices}
          onBlur={(evt) => {
            onChange(
              evt.currentTarget.value
                .split(',')
                .map((x) => x.trim())
                .filter(Boolean)
                .join(','),
            )
            onBlur()
          }}
          onChange={onChange}
        />
      )
  }
}
