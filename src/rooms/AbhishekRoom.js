const colyseus = require('colyseus');

let AbhishekRoom = class extends colyseus.Room {
    onCreate (options) {
        // this.onMessage("*", (client, type, message) => {
        //     console.log(client.sessionId, "sent", type, message);
        //     this.broadcast("action-taken", "an action has been taken!");
        // });
        this.onMessage("message", (client, message) => {
            // broadcast a message to all clients
            this.broadcast("message",  `(${client.sessionId}) ${message}`);
        });
    }
    
    onAuth(client, options, request){
        console.log("From onAuth...");
        // console.log(client);
        console.log("////////////////////////");
        return true;
    }

    onJoin(client,options,authValue){
        if(authValue){
            this.broadcast("message", `${ client.sessionId } joined.`);
        }
    }

    onLeave(client,consented){
        if(consented){
            this.broadcast("message", `${ client.sessionId } left.`);
        }else{
            console.log("Someone got disconnected from the room.");
        }
    }
    onDispose (){
        console.log("Room has been destroyed.");
    }
}

module.exports = AbhishekRoom;