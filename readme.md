# Create Next Project

Fire up new project that scores 100% on [lighthouse](https://developers.google.com/web/tools/lighthouse/) from adaptable template using a suite of awesome tools and services.

- https://zeit.co/now
- https://www.sanity.io
- https://nextjs.org (and therefore https://reactjs.org)
- https://emotion.sh

## Usage

**N.B.** you must have [now](https://www.npmjs.com/package/now) installed (and [@sanity/cli](https://www.npmjs.com/package/@sanity/cli) if you are using it) and be logged in on your cli

Create a boilerplate static next app configured to be deployed to zeit's now infrastructure...

    $ npm create next-project next-app-name

... include some npm dependencies ...

    $ npm create next-project next-app-name --npm-install lodash,jest

... configure use with emotion (install dependencies and configure babel etc...) ...

    $ npm create next-project next-app-name --with-emotion

... configure santiy cms gui and connect to existing project (for example with id: r5xu3dum) ...

    $ npm create next-project next-app-name --with-sanity r5xu3dum

... configure santiy cms gui and create new sanity project named after output directory ...

    $ npm create next-project next-app-name --create-sanity

