const express = require("express");
const app = express();
const port  = 8070;
const mongoose = require("mongoose");
const Authenticate = require("./routers/Authenticate.js");
const FaceCode = require("./routers/FaceCode.js");
const AllRoute = require("./routers/AllRoute.js");
const cors = require("cors");


// connect to mongodb
const MongoURL="mongodb://127.0.0.1:27017/SIH-Mark-Me";
// const dburl=process.env.ATLAS_URL;

main().then(()=>
    {
        console.log("successfully connected to database");
    })
    .catch((err)=>
    {
        console.log(err);
    })

async function main()
{
    await mongoose.connect(MongoURL);
}



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));


app.get("/", (req, res)=>
{
    res.send("hi ji");
})



app.use("/",Authenticate);
app.use("/", AllRoute);
app.use("/Face/", FaceCode);

app.listen(port, ()=>
{
    console.log("successfully connected at", port);
});