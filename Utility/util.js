import { Chat } from "../Classes/Room/RoomChat.js";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateToken = () => {
    let build = '';
    for (let i = 0; i < 50; i++)
        build += chars[getRandomInt(0, chars.length - 1)];
    return build;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function clamp(v, min, max) {
    if (v > max) return max;
    if (v < min) return min;
    return v;
}

export function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

export function generateBattles(amountOfPlayers=4) {
    let buildBattles = [];
    let cards = new Array(amountOfPlayers).fill(9 + (amountOfPlayers % 3 == 0) ? 1 : 0);
    let v = true;
    while (v) {
        for (let i = 0; i < amountOfPlayers; i++) {
            for (let j = 0; j < amountOfPlayers; j++) {
                if (cards[i] <= 0 || cards[j] <= 0 || i == j) continue;
                cards[i]--;
                cards[j]--;
                buildBattles.push([i, j]);
            }
        }
        v = false;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] > 0) {
                v = true;
                break;
            }
        }
    }
    return buildBattles;
}

export function getWinner(value1, value2) {
    if (value1 == value2) return 0;
    if (value1 == 0 && value2 == 2 || value1 == 1 && value2 == 0 || value1 == 2 && value2 == 1) return 1;
    return -1;
}

export function announceWinner(p1, p2, chat) {
    let winner;
    switch (getWinner(p1.playedCard, p2.playedCard)) {
        case 1:
            chat.broadcastMessage("Match won by " + p1.name);
            winner = p1;
            break;
        case -1:
            chat.broadcastMessage("Match won by " + p2.name);
            winner = p2;
            break;
        default:
            chat.broadcastMessage("Draw between " + p1.name + ' and ' + p2.name);
            break;
    }
    if (winner) winner.score++;
}