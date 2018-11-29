#CHATTY APP (Lighthouse Labs project)
=====================================

## Description:

This is a Chat application that was created as a part of Lighthouse Lab's program while learning and experimenting with React and Websockets. React is pretty darn amazing!

## How to get started:

Fork and clone this repository to your computer. Install the dependencies and follow the instructions below for accessing the boilerplate if necessary to run the React components.

Go to the main folder and start the server:
 - npm start (in the main folder)

With a second terminal window, go to the chatty-server folder to start the websocket server:
 - npm start (in the chatty-server folder)

To test it with multiple windows, open multiple tabs with the following on your computer:
 - http://localhost:3000/

Test it out by typing into the chatbar!

## Images:

(https://github.com/bert-bae/chattyapp/blob/master/src/imgs/chattyappstart.png?raw=true)
(https://github.com/bert-bae/chattyapp/blob/master/src/imgs/serverstart.png?raw=true)
(https://github.com/bert-bae/chattyapp/blob/master/src/imgs/test1.png?raw=true)
(https://github.com/bert-bae/chattyapp/blob/master/src/imgs/test2.png?raw=true)
(https://github.com/bert-bae/chattyapp/blob/master/src/imgs/test3.png?raw=true)
(https://github.com/bert-bae/chattyapp/blob/master/src/imgs/test5.png?raw=true)

## Features:

- Each unique connection:
  - Can select their own username (or remain the default 'Anonymous').
  - Be assigned one of 8 colors for their username.
  - Maintain own unique connection distinct from others.
  - Color will remain the same even if username changes.
  - Other users will see the unique color and name that is visible to the main user.

- Domain Specific Languages (implemented so far):
  - Images can be sent if the link starts with 'http(s)://' and ends with 'jpg || png || gif'
  - Starting with '/i' (lowercase) will italicize the text.
  - Starting with '/b' (lowercase) will bold the text.

## Dependencies: 
- React boiler plate dependencies:
  - More information at the Boilder Plate github link below
  - SASS, Webpack, and Babel (instructions below on utilizing the React Boiler Plate for your own projects)
- "react" (boiler plate version, instructions below)
- "express": "4.16.4",
- "ws": "6.1.2"

## How it was created using React Boiler Plate:

A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
