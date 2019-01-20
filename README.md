# Soccer manager

With this soccer manager you can select any of your favorite football players to create your own squad. 
You can see how well your squad works together by looking at their combined overall rating.

All of the data used in this application comes directly from the official FIFA19 &copy; player database.

## Requirements:

To get this application up and running you need to have:

- Git installed ---> https://git-scm.com/downloads/
- Node.js installed ---> https://nodejs.org/en/download/

(Make sure to add both Git and Node.js to your PATH environment variable, or you won't be able to use them from the CLI)

## Installation:

### Cloning the project
Clone the project in any directory you want using:

##### `git clone https://github.com/maik3y/soccer-manager.git`

After cloning the repository, navigate to your project directory using your CLI.

### Installing dependencies

To install the necessary dependencies to run this application, enter the following command:

##### `npm install`

### Starting the Node.js server

As i've mentioned this application makes use of the official FIFA19 &copy; player database.
In order for us to bypass CORS restrictions, we have to run a Node.js server which handles the API requests for us.

run the Node.js server by executing the following command:

##### `node server.js`

If the Node.js has started successfully, your CLI should now say 'listening on port: 8080'

You can now minify this CLI window.

### Starting the application

Open a new CLI window and navigate to your project folder again. Now you can run the application by typing:

##### `serve -s build`

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
