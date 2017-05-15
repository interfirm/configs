const fs = require("fs")
const assert = require("assert")
const executeSync = require("./index")

const tmpdir = "tmp"
if (!fs.existsSync(tmpdir)) {
  fs.mkdirSync(tmpdir)
}
process.chdir(tmpdir)

const workdir = fs.mkdtempSync("test-")
process.chdir(workdir)

fs.writeFileSync("package.json", JSON.stringify({
  "@interfirm/configs": {
    reek: true,
    codeclimate: [true, ".codeclimate.test.yml"],
    rubocop: true,
    editorconfig: true,
  },
}))

executeSync(process.cwd())

assert(fs.existsSync(".config.reek"))
assert(!fs.existsSync(".codeclimate.yml"))
assert(fs.existsSync(".codeclimate.test.yml"))
assert(fs.existsSync(".rubocop.yml"))
assert(fs.existsSync(".editorconfig"))
