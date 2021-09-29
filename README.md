# Twitter_Clone

Full-Stack Twitter Clone app built using the MERN stack
* This project is still a work-in-progress. Some other features that are currently being worked on include messaging other users (using Socket.io) and being able to like, comment, and retweet other users' posts, as well as being able to follow their account.

## Demo

https://user-images.githubusercontent.com/78188432/135352183-c1d11c4a-28e8-45b6-ba9e-b0c1e0628a9b.mp4

## Login Accounts To Use

Some accounts that I created in order to provide easy login without having to create an account are:
1. John Smith
  - Email: jsmith@gmail.com
  - Password: password1234
2. Jane Doe
  - Email: jdoe@gmail.com
  - Password: password1234
3. Elon Musk
  - Email: emusk@gmail.com
  - Password: password1234
4. Jordan Walke
  - Email: jwalke@gmail.com
  - Password: password1234

## How To Use

To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer. 
From your command line:

Clone this repository

```bash
$ git clone https://github.com/ChristianQ98/Twitter_Clone.git
```

From the Twitter Clone folder, change directories into the server directory

```bash
$ cd server
```

Go to the server directory and install Nodemon, Express, MongoDB, Mongoose, JSON Web Token, Bcrypt, DotEnv, CookieParser, and CORS

```bash
$ npm i nodemon express mongodb mongoose jsonwebtoken bcrypt dotenv cookieparser cors
```

Install dependencies

```bash
$ npm i
```

To start the server, run nodemon on the server.js file

```bash
$ nodemon server.js
```

Change directories into the client directory

```bash
$ cd ..
$ cd client
```

Install react-router-dom, axios, and moment

```bash
$ npm i axios react-router-dom moment
```

Install dependencies

```bash
$ npm i
```

Run the React app

```bash
$ npm run start
```

If the application does not open in the browser on its own within a minute, go to http://localhost:3000/. Enjoy!
