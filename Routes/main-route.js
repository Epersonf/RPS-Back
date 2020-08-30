import {game} from '../main-loop.js';

export const mainPath = (app) => {
    app.get('/',
        (req, res) => {
            res.write(JSON.stringify(game.tablesJson()));
            res.end();
        }
    );

    app.post('/',
        (req, res) => {
            const newTable = game.createTable(req.body.max_amount_of_players);
            res.write(JSON.stringify(newTable.json()));
            res.end();
        }
    );
}