// import * as Colyseus from "colyseus.js";

let client = new Colyseus.Client("ws://localhost:5000");

client
  .joinOrCreate("AbhishekRoom")
  .then((room) => {
    console.log(room.sessionId, "joined", room.name);

    room.onMessage("message", function (message) {
      var p = document.createElement("p");
      p.innerText = message;
      document.querySelector("#messages").appendChild(p);
    });

    document.getElementById("chatForm").onsubmit = function (e) {
      e.preventDefault();
      const input = document.getElementById("input");
      room.send("message", input.value);
      input.value = "";
    };
  })
  .catch((e) => {
    console.log("JOIN ERROR", e);
  });
