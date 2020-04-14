This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). That link has lots of details.

# Frontend code

To start the react frontend locally:

1. `npm install`
2. `npm run start`

And navigate to `localhost:3000` in your browser

# Backend code

This code uses a proxy server to bypass CORS restrictions on the OSU locations API. You need a consumer key and consumer secret with access to the location API to start the server. Once you have that, run:

1. `cd server`
2. `npm install`
3. `KEY=yourkey SECRET=yoursecret npm run start`

And then you can query the backend at `localhost:5000`. The project was built with node 13, and may not work with other versions. You should start the server before starting the frontend.
