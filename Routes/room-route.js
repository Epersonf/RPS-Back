import {game} from '../main-loop.js';

export const roomPath = (app) => {
    app.get('/room/:id',
        (req, res) => {
            const roomId = parseInt(req.params.id);
            let room = game.getRoom(roomId);
            // if (room === false) {
            //     res.end();
            //     return;
            // }

            res.write(JSON.stringify(room.gameJson()));
            res.end();
        }
    );
}