const express = require("express");
const router = express.Router();

router.route("/SignUp")
.get((req, res)=>
{
    res.send("kk");
});



module.exports = router;