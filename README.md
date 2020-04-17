# React Server Side Rendering
A baseline for server side rendering for your React application. This Project contains 
## Features

This project has support for the following things:

-   General Setup
    -   🔥 Webpack 4
    -   🔥 Babel 7
    -   ✅ Server side prerendering with Express
    -   ✅ Hot Module Reloading (HMR)
    -   ✅ CSS Modules
    -   ✅ PostCSS
    -   ✅ Optional static deployment without the need for Node.js on the server 

*   Libs and Dependencies
    -   ⚛ React 16.13
    -   ✅ Redux + Thunk middleware
    -   ✅ React Router 5
    -   ✅ React i18next for multi language support
    -   ✅ React Helmet
    -   ✅ Styled Component

Since it's only using standard APIs so far it is ready to be used with the new React Suspense feature coming in React 17!

## Installation

As a general recommendation you should create a fork of this project first so you can adjust it to your own needs, add all the dependencies you need and commit everything back into your repository.

Once you've forked the repository here on Github, clone it, `cd` into the directory and run `yarn` (or `npm install`) on your command line to install all the dependencies. You're ready to go now!

## Usage

Noteworthy npm scripts:

#### `yarn dev`

Starts the app in development mode: creates a new client and server dev build using webpack, starts the Express server build (for both file serving and server side pre-rendering) and keeps webpack open in watchmode. Updates the app (if possible) on change using HMR.

#### `yarn build`

Creates a new build, optimized for production. Does **not** start a dev server or anything else.

#### `yarn start`

Run production mode

#### `yarn pm2:start`

Run production mode with PM2 Server


## Client side version (opt-in) [NOT READY YET] 

Beginning with v1.3.0, a **static** `index.html` is also generated and written to your `clientBuild` directory. You are now able to deploy the `dist` directory to a static webhost (such as Netlify or AWS S3) and serve your application from there!

For the generation of the `index.html` the server side build gets started right after building, a headless Chrome then visits the site and writes the content of the server side response to your client directory. So you still need the `src/server` directory and the server side build but you're now flexible and can decide on your own whether you want to have the full server side experience or only deploy your completely static app somewhere.



## Component scaffolding using plop

Along with this starter kit comes `plop` - a great command line tool to keep the structure of your Redux components and Redux reducers consistent. Run `yarn plop` (or `npm run plop`) to have components and Redux reducers created for you automatically! Just enter a name, answer a few questions and you're ready to go! You can of course adjust everything to your needs. All Plop templates can be found in the `config/plop` directory.

## Caveats

-   ~~[1] MiniCSSExtractPlugin doesn't play nicely with consecutive builds in Webpack's watchmode yet ([Github issue here](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23)). So I'm using ExtractTextWebpackPlugin until this is fixed~~ Fixed! [490e6e9](https://github.com/manuelbieh/react-ssr-setup/commit/490e6e95fc811b0ce42d1bbc1252d3f26c4bd1ab)
-   ~~[2] Hot Module Replacement is still a bit buggy. Not all components have been configured and updated to play nicely with HMR (namely Redux and React-Router)~~ Seems to be fixed (still validating) [66875a1](https://github.com/manuelbieh/react-ssr-setup/commit/66875a108e6a23d704a117b0ef686db644832589)
-   Running the build in production: I **strongly** recommend to serve your static assets using **Nginx** or **Apache** instead of the `Express.static` middleware. That's how I usually do it and that's why you won't see any assets when starting the production server build with Node. If you still want to use `Express.static` in production despite the warning, have a look at the first few lines of `./src/server/index.js`. There's a short comment with a description what you need to do.



### A few notes
* I tried to limit the complexity of the entire app to focus on the server side rendering part. Don't take the same shortcuts in your production app!
* The node server needs to handle the static files from the `dist` folder.
* We're starting the server with the `server.js` file which is in the build folder.
* The entry point of the bundle is called `bundle.js` because it's the only part of our application that is not used for the server render.
