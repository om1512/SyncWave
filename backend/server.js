const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const socketServer = require("./socketSever");
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const newsFetch = require("./routes/newsFetch");

const PORT = process.env.PORT || process.env.API_PORT;
// if our application is not hosted than port number will be taken from .env file which we defined

const app = express();
app.use(express.json());
// express.json() is convert all of the data which is coming in is convert into JSON format.

app.use(cors());

// registering the routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);
app.use("/api/news", newsFetch);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`ERROR ${error}`);
  });
