import {Chess, WHITE} from "chess.js"
import { INIT_GAME } from "./messages.js"

export class Game{
        constructor(player1,player2){
            this.player1=player1
            this.player2=player2
            this.board = new Chess
            this.startTime=new Date()

            this.player1.send(JSON.stringify({
                type: INIT_GAME,
                payload: {
                        color: "w"
                }
            }))

            this.player2.send(JSON.stringify({
                type: INIT_GAME,
                payload: {
                        color: "b"
                }
            }))
        }

        makeMove=(socket, message)=>{
            if (this.board.turn() === 'w' && socket !== this.player1) {
                return;
              }
          
              if (this.board.turn() === 'b' && socket !== this.player2) {
                return;
              }

            console.log(message)

            try {
                this.board.move(message.move)
            } catch (error) {
                console.error(error)
                return
            }

            if(this.board.turn()==='w'){
                this.player1.send(JSON.stringify({type:"move",move: message.move}))
            }

            if(this.board.turn()==='b'){
                this.player2.send(JSON.stringify({type:"move",move: message.move}))
            }

            if(this.board.isGameOver()){
                this.player1.send(JSON.stringify({type: GAME_OVER,payload:{
                    winner: this.board.turn()==="w"? "black" : "white"
                }}))
                this.player2.send(JSON.stringify({type: GAME_OVER,payload:{
                    winner: this.board.turn()==="w"? "black" : "white"
                }}))
                return
            }


        }
}