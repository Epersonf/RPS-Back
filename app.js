const http = require('http');
const cors = require('cors');
const express = require('express')

const port = 4000;
const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/',
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

        switch(req.method) {
            case 'GET':
                res.write(JSON.stringify({'name': 'Tester'}));
                break;
            case 'POST':
                res.write("test");
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
        }

        res.end();
        next();
    }
);

server.listen(port, 
    (error) => {
        if (error) console.log("Error binding to port.")
        else console.log("Listening to port.");
    }
);