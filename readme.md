# Usage

Asuming you have both [@sanity/cli](https://www.npmjs.com/package/@sanity/cli) and [now](https://www.npmjs.com/package/now) installed

Create a boilerplate static next app configured to be deployed to zeit's now infrastructure...

    $ npm init next-app next-app-name

... include some npm dependencies ...

    $ npm init next-app next-app-name --npm-install lodash,jest

... configure use with emotion ...

    $ npm init next-app next-app-name --with-emotion

... configure santiy cms gui and connect to existing project (for example with id: r5xu3dum) ...

    $ npm init next-app next-app-name --with-sanity r5xu3dum

... configure santiy cms gui and create new project named after output directory ...

    $ npm init next-app next-app-name --create-sanity
