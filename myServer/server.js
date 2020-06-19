const express = require("express");
const Datastore = require("nedb");
const app = express();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

let database = new Datastore("db.db");
database.loadDatabase();

app.post("/api", (request, response) => {
    const data = request.body;
    const responseData = {
        name: data.name,
        userIpAdress: data.userIPAdress,
        latitude: data.lat,
        longitude: data.lon,
        sendTime: data.sendTime,
        ping: Date.now() - data.sendTime
    };
    database.insert(responseData);
    console.log("Received Data after: " + responseData.ping + "ms");
    console.log(data);
    response.json(responseData);
});

app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
        response.json(data);
    });
});