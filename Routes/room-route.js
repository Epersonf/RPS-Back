import {game} from '../main-loop.js';
import { User } from '../Classes/Player/Inherited/User.js';

export const roomPath = (app) => {
    app.get('/room/:id',
        (req, res) => {
            const roomId = parseInt(req.params.id);
            const token = req.headers.authorization;
            let room = game.getRoom(roomId);
            if (room === false) {
                res.end();
                return;
            }

            let user = room.getUserByToken(token);
            user.afkCheckout();

            res.write(JSON.stringify(
                {
                    'cards': room.gameJson(token),
                    'chat': room.chat.log
                }
            ));
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

    app.post('/room/:id/play/:playerId/:cardId',
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
            console.log("Recebido sinal de play card");

            room.players[playerId].playCard(cardId, token);
            res.write(JSON.stringify({'message': 'Success!'}));
            res.end();
        }
    );
}