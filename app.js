import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {loginPath} from './Routes/login-route.js';
import GameLoop from './main-loop.js';
import { mainPath } from './Routes/main-route.js';
import { roomPath } from './Routes/room-route.js';

const port = 4000;
const app = express();

const jsonParser = bodyParser.json();
const urlEncondedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlEncondedParser);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

mainPath(app);
loginPath(app);
roomPath(app);

GameLoop();

app.listen(port, 
    (error) => {
        if (error) console.log("Error binding to port.")
        else console.log("Listening to port.");
    }
);