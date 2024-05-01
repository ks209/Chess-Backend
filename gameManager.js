import { Game } from "./game.js";
import { INIT_GAME, MOVE } from "./messages.js";

class gameManager{
    constructor(){
        this.games = [],
        this.users = [],
        this.pendingUser = null
    }

    addUser(ws){
        this.users.push(ws)
        this.addHandler(ws);
    }

    removeUser(ws){
        this.users.filter(user=> user!==ws)
    }

    addHandler(ws){
        ws.on("message",(data)=>{
            const message= JSON.parse(data.toString());
            if(message.type===INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser,ws)
                    this.games.push(game)
                    this.pendingUser = null
                }else{
                    this.pendingUser = ws
                }
            }
            if(message.type === MOVE){
                const game = this.games.find(game=>game.player1 === ws || game.player2 === ws)
                if(game){
                    game.makeMove(ws,message)
                }
            }
        })
    }
}

export {gameManager}