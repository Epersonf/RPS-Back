export const loginPath = (app) => {
    app.get('/login',
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
}