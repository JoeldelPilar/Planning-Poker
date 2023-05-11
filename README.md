# Planning Poker

## About

This Planning Poker web app was a team project during the course 'Agile working methods'. The assignment was to focus on working with Scrum. <br>
Over the course of two weeks we created a mvp version of our Planning Poker idea. We worked in short sprints of one week each. <br>
Because of the course language Swedish our documentaion (foler 'scrum-cermonies') is in Swedish, feel free to use ie google translate <br>
if you are curious about our process.

## The Team

- [Liza Grapensparr](https://github.com/Grapensparr) - Scrum Master<br>
- [Tittie Thomasson](https://github.com/tittieth)<br>
- [Melvin Kempe](https://github.com/K3mp3)<br>
- [Joel](https://github.com/JoeldelPilar)

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

In the 'frontend' folder you find another README.md - file. Here we have some thoughts on how the project could proceed, what could be <br>
included in the next sprint and personal reflections.

## Get started

\* DISCLAIMER \*

This app requiers a NoSql database for full functionallity, we used MongoDB and Atlas. You can get a free acount on Atlas <br>
just follow the steps provided [here](https://www.mongodb.com/atlas). When you are up and running with Atlas, add a .env file<br>
with your connection and credentials in the backend root.

\*DISCLAIMER END \*

1. Clone this repo and save it locally on your machine.

2. Open the root folder that contains both "Backend" and "Frontend" dir.

3. <b>Backend</b>
   (for ease of use we recomend that you have nodemon installed)

- cd in to backend folder.
- type `npm install` in your terminal followed by:
- `nodemon start`

Now the server should be up and running! Default port for the server: 3000

4. <b>Frontend</b>

- cd in to frontend folder.
- type `npm install` in your terminal.
- open `Frontend/src/socket.ts` and change `const URL` to your localhost (if the project is offline the URL will be localhost by default).
- `npm run dev`

Now you should be given a url in your terminal, `ctrl` + `left click` on that url to open in browser.

Now the app is running and should work according to current version.
