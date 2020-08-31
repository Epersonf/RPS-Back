import { User } from "./Player/Inherited/User.js";
import { Bot } from "./Player/Inherited/Bot.js";
import { clamp, getRandomInt, chunkArray, generateBattles, getWinner, announceWinner } from "../Utility/util.js";
import { Chat } from "./Room/RoomChat.js";
import { game } from "../main-loop.js";

export class Room {
    constructor(id, game, maxAmountOfPlayers=4, name="Room", password, playerName="Player") {
        this.name = name;
        this.password = password;
        this.id = id;
        this.game = game;

        this.players = [];

        let user = new User(playerName, this, 0);
        this.owner = user;
        this.players.push(user);

        for (let i = 0; i < maxAmountOfPlayers - 1; i++)
            this.players.push(new Bot(this, i + 1));

        this.amountOfPlayers = 1;
        this.maxAmountOfPlayers = clamp(maxAmountOfPlayers, 2, 4);

        this.loop = 0;

        this.turnTimeInTicks = 60;

        this.chat = new Chat(this);

        this.battles = generateBattles(this.maxAmountOfPlayers);
        this.pc = 0;
        this.canShowCards = false;
    }

    canJoin() {
        for (let i in this.players) {
            if (this.players[i] instanceof Bot)
                return i;
        }
        return false;
    }

    addPlayer(name) {
        let id = this.canJoin();
        if (!id) return false;
        let user = new User(name, this, id);
        this.exchangeUser(id, user);
        this.amountOfPlayers++;
        return user;
    }

    removePlayer(id) {
        let bot = new Bot(this, id);
        this.chat.broadcastMessage(this.players[id].name + ' left the game.');
        this.exchangeUser(id, bot);
        this.amountOfPlayers--;
        if (!this.hasUsers()) game.removeTable(this.id);
    }

    exchangeUser(id, newUser) {
        if (this.player1 == this.players[id]) this.player1 = newUser;
        if (this.player2 == this.players[id]) this.player2 = newUser;
        newUser.canPlay = this.players[id].canPlay;
        newUser.cards = this.players[id].cards;
        this.players[id] = newUser;
    }

    hasUsers() {
        for (let i in this.players)
            if (this.players[i] instanceof User)
                return true;
        return false;
    }

    hasSomeoneNamed(name) {
        for (let i in this.players) {
            if (this.players[i].name == name) return true;
        }
        return false;
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
        if (this.loop == 0) {
            //distributeCards
            this.distributeCards();
        } else if(this.loop <= this.turnTimeInTicks) {
            //enable playing
            this.setBattleState(true);
            if (this.player1.playedCard != -1 && this.player2.playedCard != -1) this.loop = this.turnTimeInTicks;

        } else if(this.loop <= this.turnTimeInTicks + 5) {
            this.setBattleState(false);
            //show cards
            this.canShowCards = true;
        } else if(this.loop >= this.turnTimeInTicks + 10) {
            if (this.pc >= this.battles.length) {
                //end match
                this.loop = -1;
                this.chat.broadcastMessage("Game ended.");
                this.players.forEach((e) => e.score = 0);
                this.pc = 0;
            } else {
                //announce winner
                this.loop = 1;
                announceWinner(this.player1, this.player2, this.chat);
            }
            this.player1.playedCard = -1;
            this.player2.playedCard = -1;
            this.canShowCards = false;
        }
        this.loop++;
    }

    setBattleState(v) {
        if (this.executingBattle == v) return;
        const battle = this.battles[this.pc];
        this.player1 = this.players[battle[0]];
        this.player2 = this.players[battle[1]];
        this.executingBattle = v;
        if (v) {
            this.chat.broadcastMessage('Match between ' + this.player1.name + ' and ' + this.player2.name);
        } else {
            this.player1.playCard(0, this.player1.token);
            this.player2.playCard(0, this.player2.token);
            this.chat.broadcastMessage('Match between ' + this.player1.name + ' and ' + this.player2.name + ' ended.');
            this.pc++;
        }
        this.player1.canPlay = v;
        this.player2.canPlay = v;
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

    leaderboard() {
        return this.players.map((e) => {
            return {
                'name': e.name,
                'score': e.score
            };
        });
    }

    distributeCards() {
        let amountOfEachType = (this.maxAmountOfPlayers * 3);
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