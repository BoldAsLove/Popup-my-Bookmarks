# Popup my Bookmarks

[![Version On Chrome Web Store](https://img.shields.io/chrome-web-store/v/mppflflkbbafeopeoeigkbbdjdbeifni.svg?maxAge=3600)](https://chrome.google.com/webstore/detail/popup-my-bookmarks/mppflflkbbafeopeoeigkbbdjdbeifni)
[![Download Count On Chrome Web Store](https://img.shields.io/chrome-web-store/d/mppflflkbbafeopeoeigkbbdjdbeifni.svg?maxAge=3600)](https://chrome.google.com/webstore/detail/popup-my-bookmarks/mppflflkbbafeopeoeigkbbdjdbeifni)
[![Build Status](https://img.shields.io/circleci/project/foray1010/Popup-my-Bookmarks/master.svg?maxAge=3600)](https://circleci.com/gh/foray1010/Popup-my-Bookmarks/tree/master)

[Popup my Bookmarks](https://chrome.google.com/webstore/detail/popup-my-bookmarks/mppflflkbbafeopeoeigkbbdjdbeifni) is a Chrome extension aims at providing a more efficient way to view and manage your bookmarks menu:

- Firefox / IE-like bookmarks menu

- Place mouse over folders to open it

- Search bookmarks when you type

- Do what Bookmark manager can do and more (e.g., Sort bookmarks by name, Add separator)

- Highly configurable

- Save 24px of your vertical workspace (Rock on Chromebook!)

- Take as few permissions as possible, we never put your privacy at risk

- No background running application, save computer memory and your privacy!

Changelog: <https://github.com/foray1010/Popup-my-Bookmarks/blob/master/CHANGELOG.md>

## Legacy version

Please visit following branches for the legacy versions that support older version of Chrome

- [>= Chrome 64](https://github.com/foray1010/Popup-my-Bookmarks/tree/minimum_chrome_version_64)
- [>= Chrome 55](https://github.com/foray1010/Popup-my-Bookmarks/tree/minimum_chrome_version_55)
- [>= Chrome 34](https://github.com/foray1010/Popup-my-Bookmarks/tree/minimum_chrome_version_34)
- [>= Chrome 26](https://github.com/foray1010/Popup-my-Bookmarks/tree/minimum_chrome_version_26)
- [>= Chrome 20](https://github.com/foray1010/Popup-my-Bookmarks/tree/minimum_chrome_version_20)

## Developer guide

### Before you start

1. Install [Node.js](https://github.com/nodejs/node) (version >= 8.9) via:

   - [nvm](https://github.com/creationix/nvm) (Linux / Mac)
   - [Node.js official website](https://nodejs.org/en/download/) (Windows)

1. Install [yarn](https://github.com/yarnpkg/yarn)

   ```sh
   npm install -g yarn
   ```

1. `cd` to your workspace and install all dependencies

   ```sh
   yarn install
   ```

### Commands

1. build

   ```sh
   yarn build
   ```

   To build the whole extension and output a zip file (./build/production/{version_in_package.json}.zip) for uploading to Chrome Web Store

1. dev

   ```sh
   yarn dev
   ```

   To build a temporary folder `build/development` for loading unpacked extension

   - ES2015-2017 JavaScript to ES5 JavaScript by [Babel](https://github.com/babel/babel)
   - CSS4 to CSS3 by [postcss-cssnext](https://github.com/MoOx/postcss-cssnext)

1. lint

   ```sh
   yarn lint
   ```

   To lint if all files follow our linter config

   - ES2015-2017 JavaScript code by [ESLint](https://github.com/eslint/eslint)
   - flowtype by [flow](https://github.com/facebook/flow)
   - CSS4 code by [Stylelint](https://github.com/stylelint/stylelint)

1. md

   ```sh
   yarn md
   ```

   To generate markdown files

   - `build/store.md` - Description for Chrome Web Store
   - `README.md` - Description for GitHub

## Todo & Working Progress

See <https://trello.com/b/bREPCfDk/popup-my-bookmarks>

## Contributing

- Translate to other languages. It's all depended on volunteers as I am not a linguist. ;-)

  Please join our translation team on <https://goo.gl/ZET77>

- Fork me on GitHub, join our development!

  Repo: <https://github.com/foray1010/Popup-my-Bookmarks>
