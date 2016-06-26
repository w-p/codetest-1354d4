

## note-to-self

An ephemeral task tracker made in response to this [code test](https://github.com/jduv/codetest-1354d4).

This was developed, just for fun, in my spare time while working on other projects. Noticably lacking is documentation and frontend tests. However, my self-imposed 1 week deadline has been hit and other work now takes priority. The goals of this undertaking were:

- develop a solution in less than a week than addresses __all__ of the user stories
- create a frontend work example with `polymer`
- show a pseudo-full-stack work example
- learn how to write tests for `node.js` with `chai`, etc.
- refresh knowledge of `node.js` and `express.js` (see Anatomy)
- refresh knowledge of `polymer` and other js libraries (see Anatomy)

#### Usage

`npm start` the application and navigate to `localhost:8000`

In the login, click the `Create` tab and create an account. Doing so will also log you in. Log in sessions remain until the `logout` button on the top right is clicked, or the server is restarted.

Tasks can be created and modified with the pane on the left.

- if you change a tasks `visibility` from `public` to `private` and are not the owner, the task is no longer editable
- if you change a tasks `status` from `open` to `closed`, the task will no longer be visible in the task list
- if you change a tasks `priority`, the tasks order in the task list will change.

#### Configuration

`vim ./config.js`

#### Testing

`npm test`

Notes on testing, the following npm modules are used/required:
- chai
- mocha
- istanbul
- chai-http

#### Anatomy

This application is broken up into a couple of peices.

`nts` - a simple api server and in-memory database implementation

- __nts.server__
    - implements the api server
    - a structured convenience wrapper for express.js
- __nts.database__
    - implements an in-memory database
    - provides a model factory and a singleton database reference

`backend` - api endpoints and data models for implementing `nts.server`

- __backend.models__
    - defines data models for use with `nts.database`
- __backend.endpoints__
    - defines api endpoints for authentication, accounts, and tasks
- __backend.fakeit__
    - defines and implements mock data for demonstration purposes

`frontend/ui` - presentation and logic

- implements [polymer](https://github.com/Polymer/polymer) web components

`frontend/js/app` - implements the client-side `app` and supporting logic for `frontend/ui`

- __app.evt__
    - implements [postal.js](https://github.com/postaljs/postal.js)
    - provides communication bus for web components
- __app.io__
    - implements [fetch](https://github.com/github/fetch)
    - provides 'ajax' communication with the backend server
- __app.fx__
    - implements [web-animations.js](https://github.com/web-animations/web-animations-js)
    - provides simplified, chainable interface to web animations
- __app.validators__
    - implements [validate.js](https://github.com/ansman/validate.js)
    - provides frontend input validation

Also used:

- [lodash](https://github.com/lodash/lodash) - of course
- [loglevel](https://github.com/pimterry/loglevel) - for console logging that makes sense

#### License

MIT, see `LICENSE.md`
