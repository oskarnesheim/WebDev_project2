# Pokedex

## Description

This is a **pokedex** app that allows users to search for pokemons among 300 pokemons from the first and second generation. In addition to search, you have the ability to filter by type and sort by name, base experience and weigth, both in ascending and descending order.

By clicking on a pokemon, you can see more details about it, such as its abilities, stats and type. You also have the option to rate a pokemon and give it a review, which will show for every user.

The last feature of the app is the ability to create a team of pokemons, which can be done by clicking on the "Add to team" button on the pokemon details page. You can add up to 6 pokemons, which are possible to swap out if you want to change it later.

#### This app is best enjoyed with this song:

- https://open.spotify.com/track/3OIHgTyQdiAGMmpjQaNxp3?si=021d0102ddf841ea

## Start the App

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
- Next.js
- MongoDB
- Express
- Node.js
- TypeScript
- Tailwind CSS

## Frontend

TODO: Add frontend description

## Backend

### Server

The server is hosted on ntnu's page. TODO: write more about the server

### Database

The database we used for this project is MongoDB. TODO: write more about the database

## Test

TODO: write about testing

## Responsive Design

TODO: write about responsive design
