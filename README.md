# Mars-Rover-Dashboard

Mars Rover Dashboard - Project #2 for Udacity's Intermediate JavaScript Nanodegree
Description

This project lets a user choose from NASA's 3 most recent Mars rovers and display photos taken from the surface. The API used is:

    NASA Mars Rover Photos API

Local server running on Node and Express is used.
Prerequisite:

This project runs on a local server. It uses Node. If you don't have Node already installed on your machine, you can download it here.

You must have an API key for the NASA API above. It is free to receive a key.

After you get your API key, make a file called .env in the project root folder. File should contain:

API_KEY = {your key here}

There is an included file called .env-sample. You may add your key to this template file, then change its name to .env
Installation

If Node is installed, then you can use the Node Package Manager (npm) to install the packages needed to run this program. In the terminal, use this command:

npm install

When those packages have installed, use the following command to start the Express server.

npm start

Using the App

The server is set to port 3000. Start the server with the command in the previous section.

To load the page, set your browser's address bar to:

http://localhost:3000/

The app returns photos from the rover and some other information:

    rover name
    launch date from Earth
    landing date on Mars
    mission status (active or complete)
    date of the photos

If you want to go back to the main UI and choose a different rover, you can click a Back button, which are located above and below the photo group.
