import { WebSocketServer } from 'ws';
import { gameManager } from './gameManager.js';

const wss = new WebSocketServer({ port: 3000 });

const gamemanager = new gameManager();

wss.on('connection', function connection(ws) {
    gamemanager.addUser(ws)
    ws.off("close",()=>{
        console.log("exit")
        gamemanager.removeUser(ws)
    })
});