# chronicle-react
The UI for chronicle using react and redux

## Index

- Assumptions
- Setup
- Making the Application
  - The Home page
  - Write page
  - View Page
  - Sign up
  
## Assumptions
This repository/guide assumes that you already have a [Chronicle](https://github.com/NathanBland/Chronicle/)
server up and running at some location, or that you have followed that guide while making your own application.

Therefore, the same [prerequisites](https://github.com/NathanBland/Chronicle/blob/master/README.md#prerequisites)
from that guide still apply. Though for this, you will more be depending on the *other* instance of Chronicle to be
running those things (like mongo).

As far as experience with the technologies used. We will assume at least basic knowledge of HTML and Javascript.
If you don't know what those are, this guide is not for you. There are excellent resoureces available online if
you need to learn about those things. (links will probably be provided at some point).

## Setup
In the original Chronicle I stepped through each dependency and what it did. I will still try to do that for the
dependencies we will be directly interacting with, however, there are some setup dependencies that really are beyond
the scope of this guide.

The technologies we will use for this are: (links to come later)
- React
- Redux
- Babel 
- Fetch
- Watchify/browserify

*I will be upfront in saying that react, and redux are not my favorite methodologies and technologies. However, they
are currently worth knowing and being able to use. This guide is as much a tutorial as it is a documentary of my own 
learning and understanding.*

### Dependencies  

To get things running, let's install all of our lovely dependencies with npm.

`npm install --save whatwg-fetch babel-plugin-transform-object-rest-spread react react-dom react-redux redux redux-thunk`

We shouldn't forget our dev dependencies either.

`npm install --save-dev babel-eslint babel-preset-es2015 babel-preset-react babel-preset-stage-0 babelify browserify uglifyify watchify`

**That's a lot of packages.**

Again, I plan to talk about these when each come up in the code, but I assure you they are all
related to the technologies I mentioned above.