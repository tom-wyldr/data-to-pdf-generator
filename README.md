# PDF Generator
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/professorik/data-to-pdf-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/professorik/data-to-pdf-generator)
## Features
- Get PDF from DB
- Send xlsx and recieve PDF
- Generate from data PDF by command

## Installation
This software requires Node.js v12+ to run.

Install the dependencies and devDependencies.
```sh
npm i
```
Set up environment in .env file:
- USER
- HOST
- DB
- PASSWORD
- PORT
---
To start server:
```sh
npm run devser
```
---
To generate PDF from static data:
```sh
npm run convert
```
## Troubleshoots
If you haven't ssl certificate add in your .env file
```sh
NODE_TLS_REJECT_UNAUTHORIZED=0
```
in another case set your certificate [here][sl]

If there is an error with loading pdf, try to
change slashes [here][slash1] and [here][slash2]

## Usage
By default API works at localhost:5000.
Supported paths:
- api/recipes 
  - Input: none
  - Output: pdf
- api/generate
  - Input: xlsx **(form-data, key=input, value=*.xlsx)** 
  - Output: pdf


[sl]: <https://github.com/professorik/data-to-pdf-generator/blob/e5b3128b0871b9e24c46fe77da8502c153194f12/src/server.ts#L19>
[slash1]: <https://github.com/professorik/data-to-pdf-generator/blob/f67933b906b99dfdfe24e55b88ef479513ac8994/src/api/controllers/PageController.ts#L18>
[slash2]: <https://github.com/professorik/data-to-pdf-generator/blob/f67933b906b99dfdfe24e55b88ef479513ac8994/src/api/controllers/PageController.ts#L26>
