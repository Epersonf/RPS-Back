import { Game } from './Classes/Game.js';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const game = new Game();

export default function GameLoop() {

    const callUpdate = async () => {
        await sleep(500);
        Update();
        callUpdate();
    }
    callUpdate();

}

function Update() {
    game.update();
}