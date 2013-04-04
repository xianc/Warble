#CMPSCI 326 Web Programming: Team Sugarloaf
### This is the source code for the Warble web application

The semester project for UMass's CS326 Web Programming course focuses on implementing <a href="http://twitter.com" target="_blank">Twitter</a>. Our implementation is <b>Warble</b>-- a microblogging web application that allows users to upload files of a certain size. 

####Current Version
The current version of the Warble web app works best on the Chrome and Safari web browser.

##How to run files

1. Download the repository: https://github.com/xianc/Warble

2. Run: node app.js

3. The website will be displayed on the browser on: localhost:3000

>####Index page
>- The index page (home page) is also the login page. You may log in with the following (username, password): (Xian, Chocolate), (Eric, Smith!), (Ryan, CS326), (Hridya, Puppies), OR you can click the "Sign Up" link and create an account and sign in using that. 

>####Sign Up Page TO EDIT!!
>- The sign up page is a form that asks users for information. Currently, when information is enetered and the "sign up" button is clicked, a new user is created in an array. 

>####Forget Password Page
>- The forget password page is a one entry form that asks a user for their username or e-mail address. Currently it is not yet implemented

>####Front Page #TO EDIT
>- After a user is logged in (for in this case, the sign in button is clicked), he/she will be redirected to the front page. The front page displays recent updates from people whom the user follows as well as a status update box ("Warble" box). From the front page the user can also navigate to the Discover, At Me, and Profile pages using the header navigation bar. 

>####Discover #TO EDIT
>- The discover page displays "Warbles" from other users
>- The discover page allows a user to enter keyword searches. 
>- Users can filter searches by "Warbles," "Uploads," and "People"

>#### At Me #TO EDIT
>- The At Me page shows other user's "Warbles" that are relating or is "@" (at) the user

>#### My Profile #TO EDIT
>- The Profile page shows the user's member information (number of Warbles, uploads... etc.) as well as their most recent "Warbles" (Status Updates). 

>##### Followers #TO EDIT
>- ...
>##### Following #TO EDIT
>- ...

>####About
>- The About page gives an introduction to the web application project

##Test Files
The following are test files. 
>-chat.ejs: This file is a test of submitting and displaying a message dynamically on screen. It is used to help create the "tweet"/"warble" in user/main. You can view this test page by going to localhost:3000/chat
>-online.ejs: This file is a test to display all users from the user database. It is used to display the 5 newest users in discover.ejs
>-front.ejs: A skeleton. This page was what is now main.js. 