import {game} from '../main-loop.js';

export const roomPath = (app) => {
    app.get('/room/:id',
        (req, res) => {
            const roomId = parseInt(req.params.id);
            let room = game.getRoom(roomId);
            if (room === false) {
                res.end();
                return;
            }
            res.write(JSON.stringify(room.gameJson(req.headers.authorization)));
            res.end();
        }
    );

    app.post('/room/:id',
        (req, res) => {
            const roomId = parseInt(req.params.id);
            let room = game.getRoom(roomId);
            if (room === false || req.body.password != room.password) {
                res.end();
                return;
            }

            let user = room.addPlayer(req.body.player_name);
            res.write(JSON.stringify(
                {
                    'id': room.id,
                    'name': user.name,
                    'token': user.token,
                    'room': roomId
                }
            ));
            res.end();
        }
    );

    app.post('/room/:id/:playerId/:cardId',
        (req, res) => {
            const roomId = parseInt(req.params.id);            
            const playerId = parseInt(req.params.playerId);
            const cardId = parseInt(req.params.cardId);
            const token = req.headers.authorization;
            let room = game.getRoom(roomId);
            if (!room) {
                res.end();
                return;
            }

            room.players[playerId].playCard(cardId, token);
        }
    );
}