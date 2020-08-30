import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {loginPath} from './Routes/login-route.js';
import GameLoop from './main-loop.js';
import { mainPath } from './Routes/main-route.js';

const port = 4000;
const app = express();

const jsonParser = bodyParser.json();
const urlEncondedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlEncondedParser);

mainPath(app);
loginPath(app);

GameLoop();

app.listen(port, 
    (error) => {
        if (error) console.log("Error binding to port.")
        else console.log("Listening to port.");
    }
);