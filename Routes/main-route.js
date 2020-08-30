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
            const param = req.body;
            const newTable = game.createTable(param.max_amount_of_players, param.name, param.password);
            res.write(JSON.stringify(newTable.json()));
            res.end();
        }
    );
}