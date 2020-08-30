import cors from 'cors';
import express from 'express';
import {loginPath} from './Routes/login-route.js';

const port = 4000;
const app = express();

app.use(express.static('public'));

loginPath(app);

app.listen(port, 
    (error) => {
        if (error) console.log("Error binding to port.")
        else console.log("Listening to port.");
    }
);