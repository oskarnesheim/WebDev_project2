# Feedback and version log

In our peer reviews we received different feedback from other students. We have then tried to see on the feedback and improve our application. In this document we will go through the feedback we received and what we have done with it. We will also provied an version log were we sum up what the features of that version is.

## Delivery 1

### Version log

_In this version we had implemented the following:_

- Frontend with nearly all functionality including:
  - Grid with 20 pokemons on home page
  - Searching functionality
  - Filtering/sorting functionality
  - Navbar
  - Pokemon-stats page
  - My team page
  - Reviews for pokemons (saved in localstorage)
- Mockup data with 20 pokemons

### Feedback

_In this delivery we got feedback from 7 different groups. We have tried to go through all the feedback and how we solved it. We recived several things we could improve and have tried to sum it up in the following:_

**Feedback:** The spinning when hovering over the pokemon cards is a bit too much. <br>
**Solution:** Remove spinning and just keep the colors on the card.

**Feedback:** The styling of different buttons is not intuitive, and it is different to see that they are buttons.<br>
**Solution:** Change the buttons to make them more intuitive. For example we made a hover-over effect on the buttons and made them stand out more from the background.

**Feedback:** The arrow-buttons for the team-page is not intuitive.<br>
**Solution:** Change from 4 to 2 arrows (remove up/down arrow).

**Feedback:** Navbar is squeezed together on mobile view.<br>
**Solution:** Make a hamburger menu for mobile view.

**Feedback:** Split up the project in a client/server folder.<br>
**Solution:** As the project at stage 1 did not have a backend, we did not have a server folder. We have now split up the project in a client/server folder.

**Feedback:** "Already in team" message should be more visible or removed.<br>
**Solution:** Changed button to show "Remove from team" message when pokemon is already in team, and "Add to team" when it's not. Also made the button switch between green and red color.

**Feedback:** Bad quality on the pictures.<br>
**Solution:** The quality of the picture is bad indeed, but this is done to make the app get the old school pokemon look. Keeps the picture-quality.

**Feedback:** When clicking into a pokemon, the page is scrokled down as much as the previous page.<br>
**Solution:** Make the page scroll to the top when clicking into a pokemon.

## Delivery 2

### Version log

_In this version we had implemented the following (Changes from delivery 1 are marked in **bold**):_

- Frontend with nearly all functionality including:
  - Grid with 20 pokemons on home page
  - Searching functionality
  - Filtering/sorting functionality (**Improved from V1**)
  - Navbar (**Improved from V1**)
  - Pokemon-stats page (**Improved from V1**)
  - My team page
  - Reviews for pokemons (saved on **database**)
  - **Responsive design**
  - **About page**
  - **Pageination**
- **Backend with GraphQL and MongoDB**
  - **Database with 300 pokemons**
- **Tests**
  - **Component tests**

### Feedback

_In this delivery we also got feedback from 7 groups. Most of the feedback were positive with little improvments, but there are some things we have changed for delivery 3:_

**Feedback:** There is a enourmous JSON file in the repository which is not used.<br>
**Solution:** This was the JSON file used to fill up the database. Had just forgotten to delete it. Deleted it.

**Feedback:** The default sorting is ID, but when clicking on reset you get A-Z.<br>
**Solution:** This was something we did not catch when testing. Changed ID to default and named it _ID increasing (default)_. Also changed the reset button to reset to default.

**Feedback:** You don't get a visuall response when selected filters and sorting.<br>
**Solution:** Make a preview-box inside the "filter and sorting"-box which shows the selected filters and sorting.

**Feedback:** The page can't handle refresh.<br>
**Solution:** This was due to some wrong setup of Apache. Fixed now.

**Feedback:** The pokemon pictures are low quality.<br>
**Solution:** The same feedback as in delivery 1, and same solution (Keep pictures). We are going for a retro style.

**Feedback:** Miss sorting on pokemon ID.<br>
**Solution:** Added sorting on pokemon ID, and made this default.

**Feedback:** Font don't support Norwegian letters as _æøå_.<br>
**Solution:** Don't see this as this big of a problem as the app is in English. The font we use don't support those letters. To get the pokemon-look we want we have to keep this font, and therefore we have to live with this.

**Feedback:** Catchfrase is wrong.<br>
**Solution:** Embarassing, but we have fixed it now.

**Feedback:** Search includes every pokemon which got the given string. Should show pokemons which starts on the letters first.<br>
**Solution:** We have changed the search to only show pokemons which starts on the given string.

**Feedback:** Filtering works as a logical OR. Should include a logical AND.<br>
**Solution:** Indeed would be nice to have a logical AND, but we have not prioritized this.

**Feedback:** Some styling is inline and some styling is in seperate css files.<br>
**Solution:** We have removed inline styling where it is possible. There are som places where we use variables from the code in the styling. Here we have chosen to continue with inline styling. We also have inline styling for MUI components as you cannot style those in .css files.<br>

**Feedback:** The file with GraphQL queries is exporting functions while it can be changed to just export constants.<br>
**Solution:** We changed GraphQLQueris so the files exports graphql queris instead of funtions with the queries inside.<br>

**Feedback:** It is not intuitive what the black box on the myteam page is doing.<br>
**Solution:** Changed the box to automaticly select the first pokemon in the team, and show a text if your team is empty.

**Feedback:** The schema.js file is a bit hard to read through, so breaking it down into a few more files would be positive.<br>
**Solution:** We see the point, but have chosen to not prioritized this with the limited time.

**Feedback:** Don't see the reason for saving the page in both session storage and recoil state.<br>
**Solution:**
The reason we stored states in both Recoil and session storage is because we wanted to save filtering, etc., in session storage to improve user experience, while also wanting to have them available in Recoil state. We have modified atoms.tsx so that it is possible to store atoms without adding them to session storage. We see the search value as not necessary to have in session storage, so it is only stored as a Recoil state. The rest of the atoms are still stored in session storage as well, but the implementation has been changed so that unnecessary calls to session storage are not made. Regardless of whether the states are stored in session storage or not, they are all used in various components, and here we see Recoil state as necessary. <br>

**Feedback:** When clicking on a pokemon and then clicking on the "Pokedex" button, you get back to the previous page. Should be brought to the home page.<br>
**Solution:** We changed the Pokedex (AKA home) - navigation button to bring the user back to the homepage and at the same time reset all filters, sorting, pagination and search. <br>

**Feedback:** Error-handeling when going to a page not in use (e.g. /301).<br>
**Solution:** Add a 404 page.

## Delivery 3

### Version log

_In this version we had implemented the following (Changes from delivery 2 are marked in **bold**):_

- Frontend with nearly all functionality including:
  - Grid with 20 pokemons on home page
  - Searching functionality
  - Filtering/sorting functionality (**Improved from V2**)
  - Navbar
  - Pokemon-stats page
  - My team page (**Improved from V2**)
  - Reviews for pokemons (saved on database)
  - Responsive design
  - About page
  - Pageination
- Backend with GraphQL and MongoDB
  - Database with 300 pokemons
- Tests

  - Component tests
  - **End-to-end tests**

  ### Feedback

_In our third and final delivery received feedback from 4 groups. There wasn't a lot of feedback in which we decided to act upon this time (reasons provided below.) But we've made a few changes for delivery 3:_

**Feedback:** We got a few comments on end-to-end tests not passing.<br>
**Solution:** We suspected that this was caused by the tests tabbing pokemon cards before they've loaded. To solve this we added a delay to the test for checking wether the cards have indeed loaded before tabbing.

**Feedback:** Someone suggested that the searchbar should have a different color to prevent it from blending into the background.<br>
**Solution:** We ended up setting a darker color for both the searchbar and the filter/sorting button (for matching purposes.)

**Feedback:** Someone mentioned that Pokémon types should be included on the stat page.<br>
**Solution:** we've now included type for each Pokémon on their given page.

**Feedback:** Someone also wanted the possibility of sorting Pokémons after generation.<br>
**Solution:** We decided not to implement this because of too few sorting options, considering we only have Pokémons from two generations in our API. We also feel we have a sufficient amount of sorting options.

**Feedback:** We received a comment on potential improvement of filestructure as well as better commentation of code.<br>
**Solution:** We decided not to prioritize this feedback considering we've also gotten positive feedback on this previously. We feel satisfied in this regard for now.

**Feedbak:** Someone also said that we should consider dropping the colors of the Pokémon cards for sustainability purposes.<br>
**Solution:** We decided not to remove the coloring because we feel this change excessively affects our design in a negative way.

**Feedback:** Lastly we got a comment saying we lacked documentation on the use of Linting and Prettier.<br>
**Solution:** We've now finalized our documentation in the README file to fit these requirements.
