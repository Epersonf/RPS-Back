export const loginPath = (app) => {
    app.post('/login',
        (req, res) => {
            
            res.end();
        }
    );
}