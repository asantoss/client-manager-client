# Getting started

To get the this App running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

## Server Repo

- Server repo .

  [Github](https://github.com/asantoss/client-manager)

# Code Overview

## Dependencies

- [apollo/react-hooks](https://github.com/apollographql/react-apollo/tree/master/packages/hooks) - The apollo hooks package provides us with hooks to easily connect our React components to our GraphQL server.
- [formik](https://github.com/jaredpalmer/formik) - The formik hooks allow us to build controlled forms with react with easy validation.
- [jspdf](https://github.com/MrRio/jsPDF) - For generating PDFs from our data and making it available to users.
- [typescript](https://github.com/microsoft/TypeScript) - TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.
- [redux](https://github.com/reduxjs/redux) - Used to manage the global state of our application.

## Application Structure

- `App.js` - The entry point to our application. This file defines our routes.
- `Components/` - This folder contains subfolders of all the components.
- `Components/component` - This folder contains teh definition of each component along if an index file to export and define styles.
