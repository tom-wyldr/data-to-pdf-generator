# PDF Generator
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/professorik/data-to-pdf-generator)
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
If you haven't ssl sertificate add in your .env file
```sh
NODE_TLS_REJECT_UNAUTHORIZED=0
```
in other case set your sertificate [here][sl]

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
