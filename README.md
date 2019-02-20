# LogDNA test submission

### To Install

You must have npm installed, then from within the same folder as the submitted source

```sh
$ npm install
```

### To Test

For running unit tests against the API server functions

```sh
$ npm test
```

### To Start

From the same folder/location as the source files

```sh
$ npm start
```

### To Use

Make a GET request to the /api service including the search string urlencoded as part of the URL

For example, to parse the string "test error info":
```
GET /api/test%20error%20info
```
