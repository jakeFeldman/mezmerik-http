# @mezmerik/http

A chaining JavaScript http request utility

* Currently only accepts json responses

## Getting Started

Install @mezmerik/http

### Installing

Clone the repository

```bash
# with npm
npm install @mezmerik/http

# with yarn
yarn add @mezmerik/http
```

## Usage

```js
// With Babel
import http from '@mezmerik/http';

// GET
const response = await http('http://testurl.com/', options = {})
    .acceptJson()
    .request()

// POST
const response = await http('http://testurl.com/', options = {})
    .withJsonBody({
        // some json body
    })
    .acceptJson()
    .post()
    .request()

// PATCH
const response = await http('http://testurl.com/', options = {})
    .withJsonBody({
        // some json body
    })
    .acceptJson()
    .patch()
    .request()

```

## Built With

* [Babel](https://babeljs.io/) - JavaScript transpilation
* [Webpack](https://webpack.js.org/) - Module bundling
* [Jest](https://jestjs.io/) - Testing suite

## Contributing

PR's are welcomed.

## Versioning

We follow semver

## Authors

* **Jake Feldman** - *Initial work* - [jakeFeldman](https://github.com/jakeFeldman)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

N/A
