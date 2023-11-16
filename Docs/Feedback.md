# Feedback

In our peer reviews we received different feedback from other students. We have then tried to see on the feedback and improve our application. In this document we will go through the feedback we received and what we have done with it.

## Delivery 1

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

_In this delivery we also got feedback from 7 groups. Most of the feedback were positive with little improvments, but there are some things we have changed:_

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
**Solution:** We see the point of this and would change the search if we had more time. But we have not prioritized this.

**Feedback:** Filtering works as a logical OR. Should include a logical AND.<br>
**Solution:** Indeed would be nice to have a logical AND, but we have not prioritized this.

**Feedback:** Some styling is inline and some styling is in seperate css files.<br>
###############################################################<br>
**Solution:** @Johannes??<br>
###############################################################

**Feedback:** The file with GraphQL queries is exporting functions while it can be changed to just export constants.<br>
###############################################################<br>
**Solution:** @Oskar??<br>
###############################################################

**Feedback:** It is not intuitive what the black box on the myteam page is doing.<br>
**Solution:** Changed the box to automaticly select the first pokemon in the team, and show a text if your team is empty.

**Feedback:** The schema.js file is a bit hard to read through, so breaking it down into a few more files would be positive.<br>
**Solution:** We see the point, but have chosen to not prioritized this with the limited time.

**Feedback:** Don't see the reason for saving the page in both session storage and recoil state.<br>
###############################################################<br>
**Solution:** @Johannes??<br>
###############################################################

**Feedback:** When clicking on a pokemon and then clicking on the "Pokedex" button, you get back to the previous page. Should be brought to the home page.<br>
###############################################################<br>
**Solution:** @Johannes??<br>
###############################################################

**Feedback:** Error-handeling when going to a page not in use (e.g. /301).<br>
**Solution:** Add a 404 page.
