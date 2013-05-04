#CMPSCI 326 Web Programming: Team Sugarloaf
### This is the source code for the Warble web application

The semester project for UMass's CS326 Web Programming course focuses on implementing <a href="http://twitter.com" target="_blank">Twitter</a>. Our implementation is <b>Warble</b>-- a microblogging web application that allows users to upload files of a certain size. 

####Current Version
>-The current version of the Warble web app works best on the Chrome and Safari web browsers.
>-If the code is taking long to pull or clone, please use the zip folder instead. It usually pulls and clone, but it has been taking a couple of minutes due to the size of the project.

##How to Run Our App:

1. Download the repository: https://github.com/xianc/Warble
>-If this does not work (which is rare), download the Warble.zip file in the project's directory. 

2. Read our release document for Project #3
https://github.com/xianc/Warble/blob/master/public/TwitterImplementation.pdf

3. Run "node app.js" from the command line

4. The website will be displayed on your browser on: localhost:3000. 

5. AT THE LOGIN SCREEN USE CREDIENTIALS:
>-  Username: Tim
>-  Password: warble
  
note: The link to the specification document in the footer (next to About).


##Our Files:

>####Login page
>- The index page (home page) is also the login page. We currently have a few usernames set up. The names and passwords exist in the users database in the user.js file and are fair game to sign in with. Otherwise create a username on the sign-up form.
>- To view how the "sign up" page and "forget password page", click their correspondiong links before the sign in form. 
>- You can use (username, password): (Tim, warble) or any of these other credentials (Xian, Chocolate), (Eric, Smith!), (Ryan, CS326), (Hridya, Puppies)
>- Note: Username and Password are case-sensitive

>####Sign Up Page
>- The sign up page is a form that asks users for information.If all required information is filled out when the form is submitted, a new user is created and added to the user database in user.js and can be used to login. Otherwise, an error message will be displayed.

>####Forget Password Page
>- The forget password page is a one entry form that asks a user for their username or e-mail address. This feature is not implemented yet.

>####Main Page (user/main)
>- After a user is logged in, he/she will be redirected to the main page. On the left most column of the main page, the user is greeted with a "hello" followed by a list of online users. The list of users is linked to the user's profiles. Below this is a link to a Realtime Chat page where users can send messages to other users. The chat page is updated dynamically. A list of recent "Warbles" (updates) as well as a status update box ("Warble" box) is display to the right. By completeing the status form, a "warble" is added to the warble database and displayed at the top of the list of most recent warbles. From the main page the user can also navigate to the Discover, At Me, and Profile pages using the header navigation bar.
>- The additional feature we are adding to Warble, is the capacity to upload files, in addition to images. At the moment, clicking on "Choose File" button will prompt you to select a file, and display the name of the file. We have yet to implement the actual upload. 

>####Discover
>- The discover page displays "Warbles" from other users
>- The discover page allows a user to enter keyword searches. 
>- Users can filter searches by "Warbles," "Uploads," and "People"
>- Clicking on the username section of a user's warble brings you to their profile page.

>#### At Me
>- The At Me page shows other user's "Warbles" that relate to, or is "@" (at) the user
>- Clicking on the username section of a user's warble brings you to their profile page.

>#### My Profile
>- The Profile page shows the user's member information: Warbles, Followers, Following, and Uploads (uploads have not yet been implemented). The number of followers and following are LINKED. When clicked, a list of the user's followers and a list of useres the current user is following is displayed
>- The user's most recent Warbles are shown to the right of the above information.

>#### Followers
>- Displays a list of users who follows the user currently logged in. Users can only view their own followers. 

>#### Following
>- Displays a list of users who the user currently logged in is followers. Users can only view their own following list. 


>#### User Pages (user/:wuser)
>- This page is the skeleton of all user pages. It takes information from routes to generate a user specific page. On this page you are able to follow a user, if you have not already done so. If you are already following a user, instead of a "FOLLOW" button, text is displayed that the user is already in your following list. If the user is yourself, a "My Account" link will be dispayed. 

>####About
>- The About page gives an introduction to the web application project


##Test Files
The following are test files. 
>-chat.ejs: This file is a test of submitting and displaying a message dynamically on screen. It is used to help create the "tweet"/"warble" in user/main. You can view this test page by going to localhost:3000/chat

>-online.ejs: This file is a test to display all users from the user database. It is used to display the 5 newest users in discover.ejs

>-front.ejs: A skeleton. This page was what is now main.js. 

##Project Assignment 03
Here is a list of the files and the additions we made:

>- app.js: added new routes
####In Views
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


Note: There are additional .js files in lib (lib/followers and lib/warbles) that were never used, hence they don't have any documentation. 


##Project Assignment 4:

Our Web Sockets Implementation is our Chat Feature
Our AJAX Feature is our User Search Feature 

For AJAX:
We Referenced Example 2: Lecture 20

For Web Sockets:
We Referenced Example 1: Lecture 23


>- app.js: Added functionality to use web socket use
####In Views
>- chat.ejs: displays a chat like feature that dynamically updates the "tweet" section. This implements web sockets as apposed to AJAX in assignment 3.
>- discover.ejs: a user can dynamically search for other users by using the "I am looking for..." box which uses AJAX. Parts of queries are supported. Querying "r" for example will yield results "Eric" and "Hridya".
####In Chat
>- chat.js added functionality to support web socket instant messaging. As with the example in class our chat feature implements the Publisher/Subscriber model. Our chat supports user-name display.

##Project Assignment 5:

Replaced our fake database (Arrays) with an actual Sqlite3 database. 

>- Login, Signup, Chat, all the warble pages, and the user profiles are being rendered using the data from the database.
>- Our additional feature, uploading files in addition to images works, and has been integrated with the database. Upload can be done by clicking on the "upload" button on the main page under the input box for your post. Clicking on the "warble" button would then post your latest status and the upload file attached to it.
>- We set up a new sql folder, which contains our database data, as well as the schemas for the tables.
>- Added warbles.js to the lib folder. This contains all the necessary syntax to access the required data from our database.
>- Updated user-after.js to render the data from the database, rather than the fake database arrays.
>- Reply to and Delete Warbles are not implemented yet.




