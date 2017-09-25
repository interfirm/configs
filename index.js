const fs = require("fs")
const path = require("path")
const configFiles = require("./config-files")

const FILE_ENCODING = "utf8"

const PACKAGE_JSON = "package.json"

const CONFIG_KEY = "@interfirm/configs"

const DEFAULT_CONFIG = {
  reek: true,
  codeclimate: true,
  rubocop: true,
  editorconfig: true,
}

/**
 * Find a nearest parent directory which has a package.json
 */
const findNearestNodeDir = (dir) => {
  if (fs.existsSync(path.join(dir, PACKAGE_JSON))) {
    return dir
  }

  const parentDir = path.dirname(dir)
  const isRoot = parentDir === dir
  return isRoot ? null : findNearestNodeDir(parentDir)
}

const normalizeOption = option => (Array.isArray(option) ? option : [option, null])

/**
 * Copy each config file to the user repository.
 */
const syncConfigFiles = (userRepoDir, userConfig, allConfigs) => {
  Object.keys(userConfig).forEach((key) => {
    if (!(key in allConfigs)) {
      throw new Error(`Invalid config file key: ${key}`)
    }

    const [shouldCopy, destFile] = normalizeOption(userConfig[key])
    if (!shouldCopy) {
      return
    }

    const defaultPath = allConfigs[key]
    const srcPath = path.join(__dirname, "templates", defaultPath)
    const destPath = path.join(userRepoDir, destFile || defaultPath)

    console.log(`Sync config: ${destPath}`)
    fs.copyFileSync(srcPath, destPath)
  })
}

/**
 * Execute synchronization.
 */
const executeSync = (parentDir) => {
  const userRepoDir = findNearestNodeDir(parentDir)

  if (userRepoDir == null) {
    throw new Error(`No ${PACKAGE_JSON} found`)
  }

  const pkgFile = path.join(userRepoDir, PACKAGE_JSON)
  const pkg = JSON.parse(fs.readFileSync(pkgFile, FILE_ENCODING))
  const userConfig = Object.assign({}, DEFAULT_CONFIG, pkg[CONFIG_KEY])

  syncConfigFiles(userRepoDir, userConfig, configFiles)
}

module.exports = executeSync
