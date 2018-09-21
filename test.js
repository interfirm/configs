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

fs.writeFileSync(
  "package.json",
  JSON.stringify({
    "@interfirm/configs": {
      reek: true,
      codeclimate: false,
      rubocop: [true, ".rubocop.base.yml"],
      editorconfig: true,
    },
  })
)

fs.writeFileSync(".rubocop.yml", "---")

executeSync(process.cwd())

assert(fs.existsSync(".reek.yml"))
assert(!fs.existsSync(".codeclimate.yml"))
assert(fs.existsSync(".rubocop.yml"))
assert(fs.readFileSync(".rubocop.yml", "utf8") === "---")
assert(fs.existsSync(".rubocop.base.yml"))
assert(fs.existsSync(".editorconfig"))
