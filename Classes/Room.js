import { User } from "./Player/Inherited/User.js";
import { Bot } from "./Player/Inherited/Bot.js";
import { clamp, getRandomInt, chunkArray } from "../Utility/util.js";
import { Chat } from "./Room/RoomChat.js";

export class Room {
    constructor(id, game, maxAmountOfPlayers=4, name="Room", password, playerName="Player") {
        this.name = name;
        this.password = password;
        this.id = id;
        this.game = game;

        this.players = [];

        let user = new User(playerName);
        this.owner = user;
        this.players.push(user, this, 0);

        for (let i = 0; i < maxAmountOfPlayers - 1; i++)
            this.players.push(new Bot(user, this, i + 1));

        this.amountOfPlayers = 1;
        this.maxAmountOfPlayers = clamp(maxAmountOfPlayers, 2, 4);

        this.loop = 0;

        this.turnTimeInSeconds = 15;

        this.chat = new Chat(this);
    }

    canJoin() {
        for (let i in this.players) {
            if (this.players[i] instanceof Bot)
                return i;
        }
        return false;
    }

    addPlayer(name) {
        let index = this.canJoin();
        if (!index) return false;
        let deck = this.players[index].cards;
        let user = new User(name, this, index);
        user.cards = deck;
        this.players[index] = user;
        this.amountOfPlayers++;
        return user;
    }

    removePlayer(id) {
        
    }

    getUserByToken(token) {
        let toReturn = -1;
        for (let i in this.players) {
            if (token == this.players[i].token) {
                toReturn = this.players[i];
                break;
            }
        }
        return toReturn;
    }
    
    update() {
        this.players.forEach(e => e.update());
        const ticksPerTurn = this.turnTimeInSeconds * 2;
        if (this.loop == 0) {
            //distributeCards
            this.distributeCards();
        } else if(this.loop <= ticksPerTurn) {
            //


        } else if(this.loop <= ticksPerTurn + 5) {

            if(this.loop >= ticksPerTurn + 10) {
                
            }
        }
        this.loop++;
    }

    json() {
        return {
            'id': this.id,
            'name': this.name,
            'amount_of_players': this.amountOfPlayers,
            'max_amount_of_players': this.maxAmountOfPlayers,
            'has_password': (this.password != '')
        };
    }

    gameJson(token) {
        return this.players.map((e, index) => {
            return {
                ...e.json(token == e.token),
                'index': index
            }
        });
    }

    distributeCards() {
        let amountOfEachType = this.maxAmountOfPlayers * 3;
        let cards = new Array(amountOfEachType).fill(0).concat(new Array(amountOfEachType).fill(1)).concat(new Array(amountOfEachType).fill(2));
        for (let i = 0; i < 100; i++) {
            let index1 = getRandomInt(0, cards.length - 1);
            let index2 = getRandomInt(0, cards.length - 1);
            cards[index1] = [cards[index2], cards[index2] = cards[index1]][0];
        }
        let split = chunkArray(cards, Math.ceil(cards.length/this.maxAmountOfPlayers));
        this.players.forEach((e, index) => {
            e.cards = split[index];
        });
    }
}