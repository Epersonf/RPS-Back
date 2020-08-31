import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import GameLoop from './main-loop.js';
import { mainPath } from './Routes/main-route.js';
import { roomPath } from './Routes/room-route.js';
import { chatRoute } from './Routes/chat-route.js';

const port = 4000;
const app = express();

const jsonParser = bodyParser.json();
const urlEncondedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlEncondedParser);

app.use(cors());

mainPath(app);
roomPath(app);
chatRoute(app);

GameLoop();

app.listen(port, 
    (error) => {
        if (error) console.log("Error binding to port.")
        else console.log("Listening to port.");
    }
);