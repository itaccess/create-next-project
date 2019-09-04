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

... configure santiy cms gui and connect to existing project (for example with id: r5xu3dum) ...

    $ npm create next-project next-app-name --with-sanity r5xu3dum

... otherwise it will create a sanity project for you

## Development

... create the sample app `my-app`

    yarn create-my-app

... link the libraries for use globally on your development machine ...

    cd next-components; npm link; cd -
    cd next-sanity-schemas; npm link; cd -

... from inside app using next-components or next-sanity-schemas, link to globally available packages on your development machine ...

    cd my-app; npm link next-components; cd -
    cd my-app/cms; npm link next-sanity-schemas; cd -

... run build watchers in linked libraries ...

    cd next-components && yarn build:watch
    cd next-sanity-schemas && yarn build:watch
