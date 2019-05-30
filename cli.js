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
      "--create-sanity": Boolean,
      "--with-sanity": String,
      "--with-emotion": Boolean,
      "--npm-install": [String]
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

const dir = args._[args._.length - 1];

if (!dir) {
  console.log(readFileSync(join(__dirname, "readme.md"), "utf8"));
  process.exit(0);
}

const command = `
# use globally installed now command to initialise serverless next js boilerplate
which now &&
now init nextjs ${dir} &&
cd ${dir} &&

# copy files from template into new project folder
cp -r ${__dirname}/skeleton/. . &&

${
  args["--npm-install"]
    ? `
# npm install (using yarn) dependencies specified
yarn add ${args["--npm-install"]
        .join(",")
        .split(",")
        .join(" ")}
`
    : ``
}

${
  args["--create-sanity"]
    ? `
# setup new sanity project using @sanity/cli in sanity-cms folder
sanity init -y --output-path sanity-cms --dataset production --create-project ${dir} &&
`
    : ``
}

${
  args["--with-sanity"]
    ? `
# setup existing sanity project using @sanity/cli in sanity-cms folder
sanity init -y --output-path sanity-cms --dataset production --project ${
        args["--with-sanity"]
      } &&
`
    : ``
}

${
  args["--with-emotion"]
    ? `
# setup emotion, including dependencies, babel config and demo in pages/emotion.js
cp -r ${__dirname}/skeleton-with-emotion/. . &&
yarn add emotion emotion-theming emotion-server @emotion/babel-preset-css-prop \\
  @emotion/core @emotion/is-prop-valid @emotion/styled &&
node -p <<HERE &&
const babelrc = JSON.parse(require("fs").readFileSync("./.babelrc"))
babelrc.presets.push("@emotion/babel-preset-css-prop")
require("fs").writeFileSync(".babelrc", JSON.stringify(babelrc, null, 2))
HERE
`
    : ``
}

cd -
`.replace(/[\s\n]*$/gm, "");

console.log(`
Script to execute:

${command
  .split("\n")
  .join("\n    ")
  .replace(/^\s*#/gm, "\n    #")}
`);

if (args["--dry-run"]) {
  console.log(`remove the --dry-run flag to execute this command`);
} else {
  console.log(`... about to execute - wish me luck!`);
  exec(command);
}
