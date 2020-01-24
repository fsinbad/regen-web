# Regen Registry

The frontend registry app for the [Regen Network](https://www.regen.network) decentralized infrastructure.

## Table of Contents
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Testing](#testing)
- [Code style](#code-style)

## Installation

This project uses [lerna](https://github.com/lerna/lerna) to manage multiple packages:
- `web`: Main React application
- `web-components`: React components and [material-ui](https://material-ui.com/) custom theme
- `web-storybook`: [Storybook](https://storybook.js.org/) config

Install dependencies using:
```sh
yarn bootstrap
```

## Development

First, run:
```sh
yarn watch
```
It will watch for changes in `web-components` and rebuild them in `web-components/lib` directory.

Then, to run the main app:
```sh
yarn start
```

To run Storybook:
```sh
yarn storybook
```

## Deployment

Compile `web-components` and `web` to `web-components/lib` and `web/build` respectively:
```sh
yarn build
```

Compile `web-components` and `web-storybook` to `web-components/lib` and `web-storybook/build` respectively:
```sh
yarn build-storybook
```

## Testing

```sh
yarn test
```
Launches the test runner in the interactive watch mode.
[Jest](https://jestjs.io/) is used as test runner.

## Code style

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are used as 
code formatter and linter respectively:
```sh
yarn format
```

```sh
yarn lint
```

## Git 
### Branching Strategy
tbd

### Commit Template
The following git commit template is recommended and includes the following 
sections


* One Line Summary: replace with short headline about this commit
* Details: replace will bulleted list of notable changes
* Story: use the product story id to link this commit to,  
* Test: n | y | local | other notes to describe any testing completed
* Review: include others who reviewed this work

```One line summary

* details
*

[Story] [#storyid]
[Test] n
[Review] na
```

After saving the template above run the following command to set you email and
the commit template for this 

```git config user.email username@regen.network 
git config commit.template .gitcommit
```
