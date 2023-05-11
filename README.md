# Planning Poker

## About

This Planning Poker web app was a team project during the 'Agile Working Methods' course. The assignment was to focus on working with Scrum.
Over the course of two weeks, we created an MVP version of our Planning Poker idea. We worked in short sprints, with each sprint lasting one week.
Since the course language was Swedish, our documentation (folder 'scrum-ceremonies') is in Swedish. Feel free to use Google Translate if you're curious about our process.

## The Team

- [Liza Grapensparr](https://github.com/Grapensparr) - Scrum Master<br>
- [Tittie Thomasson](https://github.com/tittieth)<br>
- [Melvin Kempe](https://github.com/K3mp3)<br>
- [Joel del Pilar](https://github.com/JoeldelPilar)

## Tech Stack

- Vue.js 3
- TypeScript
- JavaScript
- Vite
- Express
- NoSQL - MongoDB
- Socket.io
- CSS
- HMTL

## See Also

In the 'frontend' folder, you will find another README.md file. Here, we have shared some thoughts on how the project could proceed, what could be included in the next sprint, as well as personal reflections.

## Get started

\* DISCLAIMER \*

This app requires a NoSQL database for full functionality, and we used MongoDB and Atlas. You can create a free account on Atlas by following the steps provided [here](https://www.mongodb.com/atlas). Once you are up and running with Atlas, please add a .env file with your connection and credentials in the backend root.

\*DISCLAIMER END \*

1. Clone this repository and save it locally on your machine.

2. Open the root folder that contains both "Backend" and "Frontend" dir.

3. <b>Backend</b>
   (For ease of use, we recommend having nodemon installed.)

- Cd to the backend folder ('cd backend' in the terminal).
- Type `npm install` in your terminal.
- Type `nodemon start` in your terminal

Now the server should be up and running! Default port for the server: 3000.

4. <b>Frontend</b>

- Cd to the frontend folder ('cd frontend' in the terminal).
- Type `npm install` in your terminal.
- Open `Frontend/src/socket.ts` and change `const URL` to your localhost (if the project is offline, the URL will be localhost by default).
- Type `npm run dev` in your terminal.

Now you should be given a URL in your terminal. Hold `ctrl` and click the left mouse button to open that URL in a browser.

The app should now be up and running and should work according to the current version.
