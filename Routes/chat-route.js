import { game } from "../main-loop.js";

export const chatRoute = (app) => {
    app.post('/room/:id/chat/:playerId',
        (req, res) => {
            const playerId = parseInt(req.params.playerId);
            const roomId = parseInt(req.params.id);
            const token = req.headers.authorization;
            let room = game.getRoom(roomId);
            if (room === false) {
                res.end();
                return;
            }
            const success = room.chat.addMessage(playerId, token, req.body.msg);

            res.write(JSON.stringify(
                {
                    'message': 'Success: ' + success
                }
            ));
            res.end();
        }
    );
}