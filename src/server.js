const colyseus = require("colyseus");
const express = require("express");
const http = require("http");
const app = express();
const monitor = require("@colyseus/monitor").monitor;
const cors = require("cors");
app.use(cors());
const AbhishekRoom = require("./rooms/AbhishekRoom");
const path = require("path");
app.use(express.json());
app.use("/colyseus", monitor());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

// const publicDirectoryPath = path.join(__dirname, "/static");
// console.log(publicDirectoryPath);
// app.use(express.static(publicDirectoryPath));
  
const port = 5000;

const gameServer = new colyseus.Server({
  server: http.createServer(app),
  verifyClient: (info, next) => {
    console.log("From server...");
    // console.log(info);
    console.log("///////////////////////////////");
    next(true);
  },
});

gameServer
  .define("AbhishekRoom", AbhishekRoom)
  .on("create", (room) => {
    console.log("Room Created...", room.roomId);
  })
  .on("join", (room, client) => {
    console.log(client.id, "joined", room.roomId);
  })
  .on("leave", (room, client) => {
    console.log(client.id, "left", room.roomId);
  });

gameServer.listen(port);
