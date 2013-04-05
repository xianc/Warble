#CMPSCI 326 Web Programming: Team Sugarloaf
### This is the source code for the Warble web application

The semester project for UMass's CS326 Web Programming course focuses on implementing <a href="http://twitter.com" target="_blank">Twitter</a>. Our implementation is <b>Warble</b>-- a microblogging web application that allows users to upload files of a certain size. 

####Current Version
The current version of the Warble web app works best on the Chrome and Safari web browser.

##How to run files

1. Download the repository: https://github.com/xianc/Warble
> If this does not work (which is rare), download the Warble.zip file in the project's directory. 

2. Run: node app.js

3. The website will be displayed on the browser on: localhost:3000. 

> note: The link to the specification document in the footer (next to About).

4. AT THE LOGIN SCREEN USE CREDIENTIALS:
 	Username: Xian
 	Password: Chocolate

>####Index page
<<<<<<< HEAD
>- The index page (home page) is also the login page. We currently have a few usernames set up. The names and passwords exist in the users database in the user.js file and are fair game to sign in with. Otherwise create a username on the sign-up form.
>- To view how the "sign up" page and "forget password page", click their correspondiong links before the sign in form. 

>####Sign Up Page
>- The sign up page is a form that asks users for information. Currently, when information is enetered and the "sign up" button is clicked, a new user is created in an database array. Users are redirected back to the login screen where they can use their created username to sign in.

>####Forget Password Page
>- The forget password page is a one entry form that asks a user for their username or e-mail address. This feature is not implemented yet.

>####Front Page
>- After a user is logged in (for in this case, the sign in button is clicked), he/she will be redirected to the front page. The front page displays recent updates from people whom the user follows as well as a status update box ("Warble" box). The front page also displayes other online users that are followed by the signed in user. From the front page the user can also navigate to the Discover, At Me, and Profile pages using the header navigation bar. Clicking on the username section of a user's warble brings you to their profile page.
=======
>- The index page (home page) is also the login page. You may log in with the following (username, password): (Xian, Chocolate), (Eric, Smith!), (Ryan, CS326), (Hridya, Puppies), OR you can click the "Sign Up" link and create an account and sign in using that. 

>####Sign Up Page 
>- The sign up page is a form that asks users for information. When information is enetered and the "sign up" button is clicked, a new user is created in the user database (userdb in lib/user.js). You may use this newly created information to login.

>####Forget Password Page
>- The forget password page is a one entry form that asks a user for their username or e-mail address. Currently it is not yet implemented

>####Main Page (user/main)
>- After a user is logged in, he/she will be redirected to the main page. On the left most column of the main page, the user is greeted with a "hello" followed by a list of online users. The list of users is linked to the user's profiles. Below this is a link to a Realtime Chat page where users can send messages to other users. The chat page is updated dynamically. A list of recent "Warbles" (updates) as well as a status update box ("Warble" box) is display to the right. By completeing the status form, a "warble" is added to the warble database and displayed at the top of the list of most recent warbles. From the main page the user can also navigate to the Discover, At Me, and Profile pages using the header navigation bar. 
>>>>>>> 8f27b86aefe50344fa9e3a6303b599d745bcf68c

>####Discover #TO EDIT
>- The discover page displays "Warbles" from other users
>- The discover page allows a user to enter keyword searches. 
>- Users can filter searches by "Warbles," "Uploads," and "People"
>- Clicking on the username section of a user's warble brings you to their profile page.

<<<<<<< HEAD
>#### At Me
>- The At Me page shows other user's "Warbles" that relate to, or is "@" (at) the user
>- Clicking on the username section of a user's warble brings you to their profile page.

=======
>#### At Me #TO EDIT
>- The At Me page shows other user's "Warbles" that are relating or is "@" (at) the user
>>>>>>> 8f27b86aefe50344fa9e3a6303b599d745bcf68c

>#### My Profile #TO EDIT
>- The Profile page shows the user's member information (number of Warbles, uploads... etc.) as well as their most recent "Warbles" (Status Updates). 
>- Clicking on the username section of a user's warble brings you to their profile page.


>#### Followers #TO EDIT
>- ...

>#### Following #TO EDIT
>- ...

>#### User Pages (user/:wuser)
>- This page is the skeleton of all user pages. It takes information from routes to generate a user specific page. On this page you are able to follow a user, if you have not already done so. If you are already following a user, instead of a "FOLLOW" button, text is displayed that the user is already if your following list. 

>####About
>- The About page gives an introduction to the web application project


##Test Files
The following are test files. 
>-chat.ejs: This file is a test of submitting and displaying a message dynamically on screen. It is used to help create the "tweet"/"warble" in user/main. You can view this test page by going to localhost:3000/chat

>-online.ejs: This file is a test to display all users from the user database. It is used to display the 5 newest users in discover.ejs

>-front.ejs: A skeleton. This page was what is now main.js. 

##Project Assignment 03
Here is a list of the files and the additions we made:
####In Views
>- app.js: added new routes
>- style.css: uploaded Warble Font
>- login.ejs: checks user database to validate user login
>- main.ejs: include new features (Warbles, online users, greets the user currently logged in, lists the username of online users)
>- discover.ejs: included warbles from warbledb, current users that are online, list of the five newest users,
>- me.ejs: filteres warbles that are 'at' the user that is currently logged in
>- my_profile: added a link to a list of followers and following users as well as warbles. This page also displays a count of followers, followings and warbles. The user's warbles are listed in the content box on the right by filtering through warbledb for the current user's username
>- logout: added feature to logg the user out
>- chat.ejs: displays a chat like feature that dynamically updates the "tweet" section

####In Routes
>- user-after, user-before, user-sessions: replaced index.js to render pages

####In lib/user
>-user.js: Added warbles, followers, following, and several other methods

####In node_modules
>-added connect-flash (and formidabble but it has not been implemented

####In Public
>-javascripts folder: contains the file for the dynamic updating of warbles
>-TwitterImplementation.pdf: the Requirements doc for Warble. It is linked on every page in the footer.  


