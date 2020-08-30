import { Game } from './Classes/Game.js';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function GameLoop() {
    const game = new Game();

    const callUpdate = async () => {
        await sleep(500);
        Update();
        callUpdate();
    }
    callUpdate();

}

function Update() {
    
}