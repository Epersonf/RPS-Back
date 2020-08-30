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
            const body = req.body;
            const newTable = game.createTable(body.max_amount_of_players, body.name, body.password, body.player_name);
            res.write(JSON.stringify(
                {
                    ...newTable.json(),
                    'token': newTable.owner.token,
                    'player_name': newTable.owner.name
                }));
            res.end();
        }
    );
}