# INTERFIRM Configs

[![NPM version](https://img.shields.io/npm/v/@interfirm/configs.svg)](https://www.npmjs.com/package/@interfirm/configs)
[![Build Status](https://travis-ci.org/interfirm/configs.svg)](https://travis-ci.org/interfirm/configs)

This repository manages common config files for INTERFIRM projects.
All config files are in `/templates` directory.

## Usage

1. Edit `@interfirm/configs` entry in `package.json`.
1. Install via `npm` or `yarn`:

```sh
npm install --save-dev @interfirm/configs
```

```sh
yarn add --dev @interfirm/configs
```

This package automatically copies config files to the installed repository
when downloaded into your `node_modules`.

## Configuration

```
"key": boolean || [boolean, destinationPath]
```

Default configuration:

```json
{
  "@interfirm/configs": {
    "reek": true,
    "codeclimate": true,
    "rubocop": true,
    "editorconfig": true
  }
}
```

If you omit `destinationPath`, config files are copied to default path.

## Available config files

| service/tool | key | default path |
| --- | --- | --- |
| [Reek](https://github.com/troessner/reek) | reek | .reek.yml |
| [Code Climate](https://codeclimate.com/) | codeclimate | .codeclimate.yml |
| [RuboCop](https://github.com/bbatsov/rubocop) | rubocop | .rubocop.yml |
| [EditorConfig](http://editorconfig.org/) | editorconfig | .editorconfig |

## Release

1. Run [`yarn version`](https://yarnpkg.com/en/docs/cli/version) command.
1. Push new tag to remote repository.
1. New version will be published by Travis automatically.

Example:

```sh
git checkout master
git pull
yarn version
git push --follow-tags
```
