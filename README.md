# keywords
**webpack + react + redux + express + nedb**

# get started

```
yarn install

npm run start

```
open in browser **http://localhost:8081/**

# file structure

├── README.md
├── db
│   └── users.db
├── package.json
├── server
│   ├── models
│   │   └── user.js
│   └── routes
│       └── user.js
├── server.js
├── src
│   ├── actions
│   │   └── index.js
│   ├── assets
│   │   └── css
│   │       ├── reset.scss
│   │       └── ui-elements.scss
│   ├── client.js
│   ├── components
│   │   ├── Loading
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── UserList
│   │       ├── config.js
│   │       ├── index.js
│   │       └── index.scss
│   ├── constants
│   │   └── UserActionTypes.js
│   ├── containers
│   │   └── App.js
│   ├── index.html
│   └── reducers
│       ├── index.js
│       └── users.js
├── webpack.config.babel.js
├── yarn-error.log
└── yarn.lock
