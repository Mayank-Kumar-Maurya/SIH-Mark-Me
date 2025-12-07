const express = require("express");
const app = express();
const port  = 8070;
const Authenticate = require("./routers/Authenticate.js");

app.get("/", (req, res)=>
{
    res.send("hi ji");
})

app.use("/",Authenticate);

app.listen(port, ()=>
{
    console.log("successfully connected at", port);
});