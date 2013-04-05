#CMPSCI 326 Web Programming: Team Sugarloaf
### This is the source code for the Warble web application

The semester project for UMass's CS326 Web Programming course focuses on implementing <a href="http://twitter.com" target="_blank">Twitter</a>. Our implementation is <b>Warble</b>-- a microblogging web application that allows users to upload files of a certain size. 

####Current Version
The current version of the Warble web app works best on the Chrome and Safari web browser.

##How to run files

1. Download the repository: https://github.com/xianc/Warble

2. Run: node app.js

3. The website will be displayed on the browser on: localhost:3000

4. AT THE LOGIN SCREEN USE CREDIENTIALS:
 	Username: Xian
 	Password: Chocolate

>####Index page
>- The index page (home page) is also the login page. We currently have a few usernames set up. The names and passwords exist in the users database in the user.js file and are fair game to sign in with. Otherwise create a username on the sign-up form.
>- To view how the "sign up" page and "forget password page", click their correspondiong links before the sign in form. 

>####Sign Up Page
>- The sign up page is a form that asks users for information. Currently, when information is enetered and the "sign up" button is clicked, a new user is created in an database array. Users are redirected back to the login screen where they can use their created username to sign in.

>####Forget Password Page
>- The forget password page is a one entry form that asks a user for their username or e-mail address. This feature is not implemented yet.

>####Front Page
>- After a user is logged in (for in this case, the sign in button is clicked), he/she will be redirected to the front page. The front page displays recent updates from people whom the user follows as well as a status update box ("Warble" box). The front page also displayes other online users that are followed by the signed in user. From the front page the user can also navigate to the Discover, At Me, and Profile pages using the header navigation bar. Clicking on the username section of a user's warble brings you to their profile page.

>####Discover
>- The discover page displays "Warbles" from other users
>- The discover page allows a user to enter keyword searches. 
>- Users can filter searches by "Warbles," "Uploads," and "People"
>- Clicking on the username section of a user's warble brings you to their profile page.

>#### At Me
>- The At Me page shows other user's "Warbles" that relate to, or is "@" (at) the user
>- Clicking on the username section of a user's warble brings you to their profile page.


>#### Profile
>- The Profile page shows the user's member information (number of Warbles, uploads... etc.) as well as their most recent "Warbles" (Status Updates). 
>- Clicking on the username section of a user's warble brings you to their profile page.


>####About
>- The About page gives an introduction to the web application project
