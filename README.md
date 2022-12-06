# Medusa Admin Plugin

### **Building the plugin**

1. Clone the repo
2. Run `yarn` to install dependencies
3. Run `yarn build` to build the plugin

### **Running the plugin**

> Note: Since using `yarn link` can be a bit finicky with shared medusa dependencies, the easiest way to test this locally is to install the plugin using its absolute path.

1. In `package.json` of your Medusa server add the following to the `dependencies` section:

```json

"medusa-plugin-admin": "path/to/medusa-plugin-admin"

```

2. Run `yarn` to install the plugin
3. Add the plugin to your `medusa-config.js` file:

```js
plugins: [
  // ... other plugins
  {
    resolve: "medusa-plugin-admin",
    options: {
      serve: true,
      base: "/app/", // Can be anything you want except for the reserved paths '/admin', '/store', '/'.
    },
  },
]
```

4. Run `yarn start` to start the server, you should now be greated with our React app on `/app`, or the path you specified in the `base` config.

### **Re-building the React application**

> Note: This is only needed if you change the plugin options, such as the `base` path, or you want to build the application with the intent of hosting it separately from the backend.

1. In your `package.json` add the following to the `scripts` section:

```json

"build:admin": "medusa-admin-cli build"

```

2. Run `yarn build:admin` to build the React application

If you want to host the React application separately from the backend, you can run `medusa-admin-cli build -o <path>` to build the application to your desired path. This requires that you have provided a `backend_url` in the plugin options, as this will be injected into the build and used as a source of truth for setting up `medusa-react` in the application. If you do not provide a backend url, the build will fail gracefully and inform the user what is required. If -o is used all plugin options except for `backend_url` will be ignored.
