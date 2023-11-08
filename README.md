# Pokedex

## Description

This is a **pokedex** app that allows users to search 300 different pokemons from the first and second generation. In addition to search, you have the ability to filter by type and sort by name, base experience and weigth, all in ascending and descending order. 

By clicking on a pokemon, you can see more details about it, such as its stats. You also have the option to rate a pokemon and give it a review, which will show for every user.

The last feature of the app is the ability to create a team of pokemons, which can be done by clicking on the "Add to team" button on the pokemon details page. You can add up to 6 pokemons, which are possible to swap out if you want to change it later.

#### This app is best enjoyed with this song:

- https://open.spotify.com/track/3OIHgTyQdiAGMmpjQaNxp3?si=021d0102ddf841ea

## Visit the app

The app is hosted on NTNU's servers. This means that in order to visit the webpage you have to be on an NTNU network or connect with VPN. Once you have connected the site can be visited at:

- http://it2810-08.idi.ntnu.no/project2/


## Start the App locally

### Environment variables

To be able to run the app, you need to create a `.env` file in the root folder. This file should contain the following variables (with correct username/password):

```
NODE_ENV = development
PORT = 6969
MONGO_URI = mongodb://USERNAME:PASSWORD@it2810-08.idi.ntnu.no:27017/pokemon_db
```

### Install dependecies

The first thing to do is install all the dependencies. This is important to do in both folders (_Client_ and _Server_) aswell as the root folder.
Run the following command all 3 places:

```
npm install
```

Then go to `localhost:6969` in your browser.

### Run the app in one terminal

After installing the dependencies, you have the choice to run the app with on terminal, or run the client and server in seperate terminals.

To run one terminal, you can run the following command in the root folder:

```
npm start
```

### Starting server and client in seperate terminals

#### Start the server

Start the server by running the following command in the server folder:

```
npm run server
```

#### Start the client

Start the client by running the following command in the client folder:

```
npm run dev
```

Open in browser by writing:

```
o
```

## Tech Stack

The tech stack used in this project is the following:

- React
- TypeScript
- Material UI
- Recoil
- Apollo Client
- GraphQL
- Node.js
- Express
- MongoDB
- Mongoose

## Frontend

The frontend can be found in the `client` folder, and is built with React and TypeScript. For global state we use Recoil. For fetching and caching data from the bachend we use Apollo client with Graphql. This way we are able to get just the data we need, and not the whole database. For styling we use Material UI. Material UI is a component library that makes it easy to create responsive and good looking components.

### Server

The server is built with Node.js and Express, and responsible for fetching data from the database and sending it to the client. The server also handles the requests from the client, such as adding a pokemon to the team, and saving it to the database.

We have used mongoose to connect to the database, and to create schemas for the different models we use.

### Database

The database we used for this project is MongoDB. We host the database on NTNU's server, which is only accissible from NTNU's network or via an VPN. The database contains 300 pokemons from the first and second generation. The data is fetched from [PokeAPI](https://pokeapi.co/). In addition to pokemons, the database also saves the reviews the different users publish about the pokemons.

## Testing

### Component testing

TODO: write about component testing

### End-to-end testing

TODO: write about end-to-end testing

## Responsive Design

TODO: write about responsive design

## Sustainability

TODO: write about sustainability
