import { Player } from "../Player.js";
import { generateToken } from "../../../Utility/util.js";

export class User extends Player {
    constructor(name="Player") {
        super(name);
    }
}