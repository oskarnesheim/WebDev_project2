# Pokedex

## Description

This is a **pokedex** app that allows users to search for 300 different Pokémons from the first and second generation. In addition to searching, you have the ability to filter by type and sort by name, base experience and weigth, all in ascending and descending order.

By clicking on a Pokémon, you can see more details about it, such as its stats. You also have the option to rate a Pokémon and give it a review. The review is visible to all other users of the application.

The last feature of the app is the ability to create a team of Pokémons, which can be done by clicking on the "Add to team" button on the Pokémon details page. You can add up to 6 Pokémons, which are possible to swap out if you want to change it later.

#### This app is best enjoyed with this song:

- https://open.spotify.com/track/3OIHgTyQdiAGMmpjQaNxp3?si=021d0102ddf841ea

## Visit the app

The app is hosted on NTNU's servers. This means that in order to visit the web page you have to be on a NTNU network or connected with VPN. Once you have connected the site can be visited at:

- http://it2810-08.idi.ntnu.no/project2/

## Start the App locally

### Environment variables

To be able to run the app, you need to create a `.env` file in the root, client and server folder. This file should contain the following variables:

```
NODE_ENV = development
PORT = 6969
MONGO_URI = mongodb://admin:dreamteam08@it2810-08.idi.ntnu.no:27017/pokemon_db
```

### Install dependencies

The first step is to install the required dependencies for the application. This is important to do in the root folder, as well as both (_Client_ and _Server_).
Run the following command all 3 places:

```
npm install
```

### Run the app in one terminal

After installing the dependencies, you have the choice to run the app with one terminal, or run the client and server in seperate terminals.

To run one terminal, you can run the following command in the root folder:

```
npm start
```

Then you go to `http://localhost:5173/project2`.

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

Or go to `http://localhost:5173/project2`.

## Tech Stack

The tech stack used in this project is the following:

- React
- TypeScript
- Material UI
- Recoil
- Apollo Client
- GraphQL
- Express
- Node.js
- Mongoose
- MongoDB

## Frontend

The frontend can be found in the `client` folder, and is built with React and TypeScript. For global state management we use Recoil.

We decided to use Recoil for local state management. Recoil makes it easy for all components to use the same state without passing props. This results in a clean code that is easy to understand. The decision was based on previous experience with the technology and recommendation in the project description. We used Recoil for storing state about search, filter, sorting, page and maxpage. And is usefull for  remebering all the states mentioned above when a user click on a pokemon and goes back to the mainpage.

For fetching and caching data from the backend we use Apollo client with GraphQL. This way we are able to get just the data we need for each query. An example is when fetching information about a Pokémon, here we only get the few attributes about the pokemon that we need for the rendering. If we would have used REST API we would get all the information Pokémon stored in the database. This would result in a lot of unnecessary data being sent over the network. Apollo client also makes it easy to cache data, which is useful when the user goes back and forth between pages.

For styling we use Material UI. Material UI is a component library that makes it easy to create responsive and good looking components. It is widely used and has very good documentation and support with React.

### Server

The server is built with Node.js and Express. It is responsible for fetching data from the database and sending it to the client. The server also handles mutations, such as adding a review for a Pokémon.

The combination of Node.js and Express is a widely used  choice for building web applications. Here we have JavaScript/TypeScript in both the backend and frontend. All group members have experience with both languages which made it an easy choice.

We have used mongoose to connect the server to the database, and create schemas for the different models we use. These include Pokémons and reviews.

The decision to work with Mongoose was based on the fact that it is a popular library for MongoDB and Node.js. Resulting in great performance and plenty of good documentation. When looking back on this decision we are very happy. When we faced problems, we were able to quickly find a solution due to the great amount of documentation and online sources.

### Database

The database we used for this project is MongoDB. The database contains 300 Pokémons from the first and second generation. All the data is collected from [PokeAPI](https://pokeapi.co/). In addition to Pokémons, the database also saves the reviews different users publish about the Pokémons.

We decided to use MongoDB because of its high performance and ease of use. The data is stored in BSON (Binary JSON) which is an advantage for developers used to working with JSON. All the members in the group have experience working with JSON, so it made sense to work with it this time as well.

## Testing

### Component testing

We have created multiple tests for checking our application's behavior. We have different types of component tests. Some of them are testing the rendering of the components, while others are testing the functionality of the components. There also exist tests for the different functions we have created. We have made mocks for the functions that call on the server. This is to make sure that the tests are not dependent on the backend/server. We have also made snapshot tests which are used to check if the components are rendered correctly. 

To write component tests we have used **Vitest**.

The reason we don't have component tests for every function and line of the code is that we found this to be redundant with our end-to-end testing. The functionality that is not tested through component tests are tested through end-to-end tests (for example the accessibility of the app).

### End-to-end testing

We created end-to-end tests for several scenarios. Our tests cover mostly functionality of the app except testing to publish a review. The reason we don’t have review tests is written in [Choices.md](/Docs/Choices.md#end-to-end-testing) By testing a series of user-interactions, we get to see how the app performs when people use it. The tests are also important for discovering errors. An example to illustrate this is when a member of the group refactored the recoil-functionality and did something wrong which caused the team-function to not work as intended. This was quickly discovered due to a failed test.

### Running the tests

Make sure you are connected to NTNU network/VPN. Then go in the /Client folder and run the following commands:<br>
**Component tests:**

```
npm run test
```

**End-to-end tests:**

```
npm run e2e
```

### Linting

We have used ESLint to lint our code. Linting makes the code more consistent and readable. It also helps us to avoid errors.

You can run the linter by typing the following command in the Client directory:

```
npm run lint
```

### Prettier
For formatting we have used Prettier. This is to make sure that the entire codebase is formatted the same way. This also makes it easier for other developers to look at our code, since the code looks clean and they most likely use the same. 

You can run Prettier by running the following command in the Client directory:

Checking if the code is formatted correctly:

```
npm run prettier-check
```
Formatting the code:

```
npm run prettier-write
```

## Responsive Design

We have taken several steps to make the app responsive. We have used Material UI's Grid system to make the frontpage responsive. This means that when you shrink the window, the content will automatically change from 4 cards on a row to 1 card. We have also made the navbar responsive, so that it will collapse into a hamburger menu when the window is too small. The same goes for the Pokémon details page, where the Pokémon picture will shrink at first before it is placed below the stats. The same goes for the team page, where the Pokémons will be placed below each other when the window is too small.

## Accessibility

In order to make our application accessible to as many users as possible, we've taken several steps. These include: 

### Keyboard navigation
The user can use the tab key to navigate through the application. In addition the user can go up and down in lists with the arrowkeys and enter to select an item. This is useful for users who navigate without a mouse. 
### Text-to-speech
The user can use text-to-speech to read the content of the application. This is useful for users with visual impairments. This pairs well with the tabbing functionality, as the user can tab through the application and have the content of each tab read out loud. This can be experienced using a browserextension such as [Screen Reader](https://chromewebstore.google.com/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn)

## Sustainability

When developing applications, sustainability have become an important factor to consider. With the increasing use of technology, it is important to make sure that the applications we develop are sustainable in order to use as little resources as possible. Even though we want to make the app use as little resources as possible, there is a middleground between sustainability and user experience.

In our project, we have taken some consideration in terms of page loading, color/font cost, and the use of images. Read more about our choices regarding sustainability in [Choices.md](/Docs/Choices.md#sustainability)
