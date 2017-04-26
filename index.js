const fs = require("fs")
const path = require("path")
const configFiles = require("./config-files")

const copyFile = (src, dist) => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dist))
}

/**
 * Find a nearest parent directory which has a package.json
 */
const findNearestNodeDir = (dir) => {
  if (fs.existsSync(path.join(dir, "package.json"))) {
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

    const [shouldCopy, distFile] = normalizeOption(userConfig[key])
    if (!shouldCopy) {
      return
    }

    const defaultPath = allConfigs[key]
    const srcPath = path.join(__dirname, "templates", defaultPath)
    const distPath = path.join(userRepoDir, distFile || defaultPath)

    console.log(`Sync config: '${srcPath}' to '${distPath}'`)
    copyFile(srcPath, distPath)
  })
}

/**
 * Execute synchronization.
 */
const executeSync = () => {
  const parentDir = path.resolve(__dirname, "..")
  const userRepoDir = findNearestNodeDir(parentDir)

  if (userRepoDir == null) {
    throw new Error("No package.json found")
  }

  const configPath = path.join(userRepoDir, "if-configs.json")

  if (!fs.existsSync(configPath)) {
    throw new Error(`No config file found: ${configPath}`)
  }

  const userConfig = JSON.parse(fs.readFileSync(configPath))
  syncConfigFiles(userRepoDir, userConfig, configFiles)
}

module.exports = executeSync
