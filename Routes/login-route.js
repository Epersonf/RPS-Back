export const loginPath = (app) => {
    app.post('/login',
        (req, res) => {
            res.write(JSON.stringify(req.body));
            res.end();
        }
    );
}