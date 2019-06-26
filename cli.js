#!/usr/bin/env node
const childProcess = require("child_process");
const arg = require("arg");
const { readFileSync } = require("fs");
const { join } = require("path");

const exec = cmd =>
  childProcess.execSync(cmd, {
    encoding: "utf8",
    stdio: ["inherit", "inherit", "inherit"]
  });

let args;
try {
  args = arg(
    {
      "--dry-run": Boolean,
      // "--create-sanity": Boolean,
      // sanity init -y --output-path cms --dataset production --create-project $DIRECTORY
      "--with-sanity": String,
      "--with-emotion": Boolean,
      "--npm-install": [String],
      "--description": String,
      "--theme-color": String,
      "--theme-background": String
    },
    {
      // permissive: true
    }
  );
} catch (err) {
  if (err.code === "ARG_UNKNOWN_OPTION") {
    console.log(err.message);
    process.exit(1);
  } else {
    throw err;
  }
}

// process.env.DIRECTORY = join(__dirname, args._[args._.length - 1]);
process.env.DIRECTORY = args._[args._.length - 1];
process.env.DIRNAME = __dirname;

if (!process.env.DIRECTORY) {
  console.log(readFileSync(join(__dirname, "readme.md"), "utf8"));
  process.exit(0);
}

const envified = Object.entries(args).reduce(
  (memo, [arg, value]) => ({
    ...memo,
    [arg
      .toUpperCase()
      .replace(/--/, "")
      .replace(/-/g, "_")
      .replace(/^_$/, "PARAMS")]: Array.isArray(value)
      ? value.join("\n")
      : value
  }),
  {}
);

process.env = { ...process.env, ...envified };

const initCommand = `
${__dirname}/scripts/init-next-project
`

const command = `
# copy files from template into new project folder
${__dirname}/scripts/install-dependencies
${__dirname}/scripts/with-sanity
cp -r ${__dirname}/skeleton/. .
${__dirname}/scripts/configure-json-files
${__dirname}/scripts/install-sanity-dependencies
rm pages/about.js
`

if (args["--dry-run"]) {
  console.log(command)
  console.log(`remove the --dry-run flag to execute this command`);
} else {
  exec(initCommand)
  process.chdir(process.env.DIRECTORY)
  exec(command)
}
