# chronicle-react
The UI for chronicle using react and redux

## Index
- Index
- Goals
- Assumptions
- Setup
- Making the Application
  - The Home page
  - Write page
  - View Page
  - Sign up

## Goals
It is always fun to talk about what you want your application to do before making it, so let's put that into practice.

By the time we are done, we should be able to:
- [ ] View a home page for `Chronicle`
- [ ] Retrieve and view data in a SPA format
- [ ] View entries that have been created on `Chronicle`
- [ ] Create entries on `Chronicle`
- [ ] Create a user on `Chronicle`
- [ ] Sign in as a user on `Chronicle`
- [ ] Advanced features 

Currently we can't do any of these things, so let's dig in.

## Assumptions
This repository/guide assumes that you already have a [Chronicle](https://github.com/NathanBland/Chronicle/)
server up and running at some location, or that you have followed that guide while making your own application.

Therefore, the same [prerequisites](https://github.com/NathanBland/Chronicle/blob/master/README.md#prerequisites)
from that guide still apply. Though for this, you will more be depending on the *other* instance of Chronicle to be
running those things (like mongo).

The notable different dependency will be `python`. You will need to know your version as well.

As far as experience with the technologies used. We will assume at least basic knowledge of HTML and Javascript.
If you don't know what those are, this guide is not for you. There are excellent resoureces available online if
you need to learn about those things. (links will probably be provided at some point).

## Setup
In the original Chronicle I stepped through each dependency and what it did. I will still try to do that for the
dependencies we will be directly interacting with, however, there are some setup dependencies that really are beyond
the scope of this guide.

For an editor, I am using `vscode`, but `atom` would work as well, or really any editor. 
For santiy, use something that has syntax highlighting.

The technologies we will use for this are: (links to come later)
- `React` (for our view)
- `Redux` (for this pesky thing called state)
- `Babel` (for fancy es6 features, which are new javaScript abilities)
- `Fetch` (for grabbing and sending data)
- `Watchify/browserify` (to keep us sane while developing)

*I will be upfront in saying that react, and redux are not my favorite methodologies and technologies. However, they
are currently worth knowing and being able to use. This guide is as much a tutorial as it is a documentary of my own 
learning and understanding.*

Make a project folder:

`$ touch chronicle-react`

Or if you started with a git repository from gitHub (**recommended**):

`$ git clone <yourRepoURL>`

After you have your project folder around, setup version control if you haven't
already, and make sure you are in the directory.
`$ cd chronicle-react`

### Dependencies  

To get things running, let's install all of our lovely dependencies with npm.

`$ npm init`

`$ npm install --save whatwg-fetch babel-plugin-transform-object-rest-spread react react-dom react-redux redux redux-thunk`

We shouldn't forget our dev dependencies either.

`$ npm install --save-dev babel-eslint babel-preset-es2015 babel-preset-react babel-preset-stage-0 babelify browserify uglifyify watchify`

**That's a lot of packages.**

Again, I plan to talk about these when each come up in the code, but I assure you they are all
related to the technologies I mentioned above.

## Making the Application
According to our goals (and our index) the first thing that we want to be able to do
is view a home page for our application. In my case that is a front-end for `Chronicle`.

Since we are using react, this is a bit more complex than a little jade/pug/html file. 
We will make our application using components, which help split up pieces of the page
to make them easier to maintain.   

*..Stop talking so much and show me how to make things!*

Alright, alright.

Project structure:
```
-chronicle-react/
--build/
----js/
--app/
----components/
----actions/
----reducers/
----app.jsx
--package.json
--.babelrc
```

Create these files either with terminal, or your editor/ide. 

We will start with this anyway.

To make our lives easier, if you remember, we included `watchify`. Time to make a script that uses it.

Open up `package.json`, under the `scripts` key, you will add a `dev` script:
```
"dev": "cd build/ && python -m SimpleHTTPServer &  watchify -v -d app/app.jsx -t babelify --extension=jsx -o build/js/app.js",
```

*if you are running python 3 and not python 2, it would be `python -m http.server` instead*

I added mine **before** the existing `test` script. The location of this is important
due to the trailing `,` at the end. if your script is added *after* `test` make sure
to move the comma up to the end of the `test` script.

This won't run yet, because our `app.jsx` is currently a blank whole in the ground.

Open it up, and give it some life:

```javascript
import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
```
Now if you tried to run this, it would try, but it would give you an error notice:

`ParseError: 'import' and 'export' may appear only with 'sourceType: module'`

We also need to configure Babel. Let's do that by opening up `.babelrc`

```
{
  "presets": ["es2015", "react"],
  "plugins": ["transform-object-rest-spread"]
}
```

This is telling babel about the plugins and presets we installed earlier. 
Without this browserify has no idea how to use our code.

We still need to give it something to actually render. Let's do that, adding to our jsx file.

```javascript
import App from './components'
import reducer from './reducers'

const store = createStore(reducer)

ReactDOM.render(
  <App store={store} />,
  document.querySelector('#root')
)
```

There is a lot of new stuff going on here. Also, our app *still* doesn't run.

That's because this is foundational work. the `App` that we are importing will
come from our components `index.jsx` file, and will hold the core of our application.

The `reudcer` is a fun way of punching ourselves in the face at first, but will be how
we control actions and what they do with our data later on. (Don't worry about it for now)

The `store` is related to that `reducer`. I'm going to try and explain what this is without
using the phrase `application state` because while learning this, I heard it all the time
and it drove me crazy. So what does the store do for us? Well it holds our information.
Did we just get a new list of journal entries from the server? Let's give them to the store
to hold. Did a user just sign in? Give the access token to the store. 
Later, we may even use it to hold our location in the application!

To try and put it simply, we use it as a go-between for our data, and what we want to do with it.

Finally, we have `ReactDOM.render()` and it has parameters in it that look like a
strange hybrid between `javaScript` and `html`. Well, that's because it is. Without going into
extensive detail on how `react` works know that it is *technically* javascript, though
there is a *lot* of sugar on top, and some modifications as well.

*...But where is that `#root` pointing to?*

That references an element id in a file we haven't made yet. So let's make it.

Create and open `build/index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Chronicle</title>
  <meta charset="utf-8">
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
  <!-- CSS Reset-->
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
</head>

<body>
  <div id="root"></div>
  <script type="text/javascript" src="/js/app.js"></script>
</body>

</html>
```

This is our launch point, we really won't touch this file again if we can help it.
We need to know what is happening anyway though.

Most of this is *boilerplate* html. With the noticable exception of the `<script>` tag
at the bottom of the `<body>` element. This is where we are including our compiled 
react application code. (All that other stuff we are working on)

The `div` element above it, is what that `#root` selector was linking to.

At this point, if you run `$ npm run dev` your application should come to life on 
port `8080` on your localhost. *If it doesn't, forgive me, I probably missed a step.
file an issue, and I'll see about getting it fixed*

### The Home Page
