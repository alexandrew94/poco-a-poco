# poco a poco
---

![Image of Landing Page](./readme-images/landing-page.png)

## API

* [Link to API Documentation](API.md)

## Description

As a former music student, I am painfully aware of how frustrating practicing can be. When learning new music, or when learning a new instrument, it is extremely easy to become frustrated and discouraged by only seeing what you presently can’t do or how much you haven’t done, losing track and losing perspective on all of the progress you’ve in fact already been making this whole time. This web app aims to help music learners learn better by better keeping track and keeping perspective on their progress.

The app was built using a React.js front-end and a Node.js back-end. I used this project as an opportunity to explore data manipulation in-depth, especially with regards to the use of back-end endpoints and how the back-end should serve the data for the many different ways it is to be displayed and/or visualised in the front-end. I chose Chart.js as a data visualisation library, and found it to be robust and a great visual addition to the app. In order to improve the UX, I also made use of the Wikimedia API for an “autocorrect” feature and Moment.js for date manipulation.

## Technologies Used

* ReactJS
* Node.js (with Express)
* MongoDB (with Mongoose)
* CSS3 (with SASS and BULMA)
* Chart.js
* Moment.js

## Screenshots

Main user dashboard:
![Screenshot 1](./readme-images/screenshot1.png)

Logs of the user's recent activity:
![Screenshot 2](./readme-images/screenshot2.png)

List of the user's pieces:
![Screenshot 3](./readme-images/screenshot3.png)

Edit page for updating the user:
![Screenshot 4](./readme-images/screenshot4.png)

Mini 'dashboard' showing the user's recent progress on each piece:
![Screenshot 6](./readme-images/screenshot6.png)

Screen for inputting practice log data for each piece:
![Screenshot 5](./readme-images/screenshot5.png)

## Code Examples

Here are some of the code snippets in this project that I found the most challenging to write.

*Example 1: A Mongoose virtual on the user model.*
```javascript
userSchema
  .virtual('composersLog')
  .get(function () {
    const composersLogObject = {};
    if(this.pieces) {
      this.pieces.forEach(piece => {
        piece.diary.forEach(diaryEntry => {
          if (Object.keys(composersLogObject).includes(piece.composer)) {
            composersLogObject[piece.composer] += diaryEntry.timePracticed;
          } else {
            composersLogObject[piece.composer] = diaryEntry.timePracticed;
          }
        });
      });
      return composersLogObject;
    }
  });
```

In the model for the user resource, I made extensive use of virtuals in order to process data that the front end could display that had no reason to be stored in the database anywhere. This virtual in particular was one of the more complex to write, since it required a double `forEach()` to iterate over some arrays inside of an array. Essentially, this was necessary because the `composer` was stored on `user.piece.composer`, whilst the time logged for each piece was stored on `user.piece.diaryEntry.timePracticed`, which required extraction of the data from within the diary entry in order to sum it.
