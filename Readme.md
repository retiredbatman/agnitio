# Agnitio

## Face recognition application

Agnitio is simple application that detects faces from an image
ReactJS and nodeJs application.

## Features

- Login to the application as admin user and see all the requests and statuses
- Upload images with a name and create requests to see the number of faces in the image

## Tech

Dillinger uses the following frameworks:

- [ReactJS] - Frontend UI application
- [Typescript] - type checking
- [material-ui] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [face-api.js] - face recognition library

## Installation

The application needs docker and docker-compose to run

For production environments...

### Docker

```sh
git clone
cd agnitio
docker-compose up -d --build
```

The frontend server is available at http://localhost:3001
the backend server is available at http://localhost:3000

### Development

```sh
git clone
cd server
npm install
npm run dev
```

```sh
git clone
cd client
npm install
npm start
```

## Notes

- An admin user is already configured and the username is `admin`
- Login works with any username
- face-api.js `detectAllFaces` is a synchronous operation as it is a limitation of the tensorflow library for nodejs. The way to solve it would be to use `worker-threads` but it is not implemented in this application
- The user is autheticated using a `jsonwebtoken` which is valid for 30 minutes. After the token is expired, refreshtoken is called to get a new token and the flow continues.
