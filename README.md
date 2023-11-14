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

To be able to run the app, you need to create a `.env` file in the root folder. This file should contain the following variables:

```
NODE_ENV = development
PORT = 6969
MONGO_URI = mongodb://admin:dreamteam08@it2810-08.idi.ntnu.no:27017/pokemon_db
```

### Install dependecies

The first thing to do is install all the dependencies. This is important to do in both folders (_Client_ and _Server_) aswell as the root folder.
Run the following command all 3 places:

```
npm install
```

Then go to `localhost:6969` in your browser.

### Run the app in one terminal

After installing the dependencies, you have the choice to run the app with one terminal, or run the client and server in seperate terminals.

To run one terminal, you can run the following command in the root folder:

```
npm start
```
Then you go to the localhost given given.

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

The frontend can be found in the `client` folder, and is built with React and TypeScript. For global state management we use Recoil. 

We decided to with Recoil for local state management. Recoil makes it easy for all components to use the same state without passing props. This results in a clean code that is easy to understand. This decision was based on previous experience with the technology and recommendation in the project description. We used Recoil for storing state about search, filter, sorting, page and maxpage when a user goes to pokemon or “My Team” and back to the homepage.

For fetching and caching data from the backend we use Apollo client with Graphql. This way we are able to get just the data we need for each query. An example is when fetching information about a pokemon. If we would have used REST API we would get all the information pokemon, when in reality we just needed maybe 6 attributes. 

For styling we use Material UI. Material UI is a component library that makes it easy to create responsive and good looking components. It is widely used and has very good documentation and support with React.

### Server

The server is built with Node.js and Express. It is responsible for fetching data from the database and sending it to the client. The server also handles mutations, such as adding a review to a pokemon.

The combination of Node.js and Express is a very good choice for building web applications. Here we have javascript/typescript in both the backend and frontend. All group members have experience with both languages which made it an easy choice.

We have used mongoose to connect the server to the database, and create schemas for the different models we use. These include pokemons and reviews.

The decision to work with Mongoose was based on the fact that it is a popular library for Mongodb and Node.js. Resulting in great performance and plenty of good documentation. When looking back on this decision we are very happy. When we faced problems, we were able to quickly find a solution due to the great amount of documentation and online sources.

### Database

The database we used for this project is MongoDB. We host the **database** on NTNU's server, which is only accessible from NTNU's network or via a VPN. The database contains 300 pokemons from the first and second generation. The data is fetched from [PokeAPI](https://pokeapi.co/). In addition to pokemons, the database also saves the reviews the different users publish about the pokemons.

We decided to use Mongodb because of its high performance and ease of use. The data is stored in BSON (Binary JSON) which is an advantage for developers used to working with JSON. All the members in the group have experience working with JSON, so it made sense to work with it this time as well. 

## Testing

### Component testing

We have created multiple tests for checking our application's behavior. Our project so far includes testing of various functionalities such as navigation, searching, filtering and sorting. (Testing of review form is under maintenance for now).

#### Running the tests

Make sure you are in the /Client folder and run the following command:

```
npm test
```

### End-to-end testing

TODO: write about end-to-end testing

## Responsive Design

TODO: write about responsive design

## Sustainability

TODO: write about sustainability


heisann
