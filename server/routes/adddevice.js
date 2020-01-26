const express = require('express');
const router = express.Router();
const db = require("./setupdb.js");

router.post("/", (req,res) => {

    db.collection("Customers").doc(req.body.username).get()
    .then((username) => {
        if (!username.exists) {
            res.status(201).send("username does not exist");
        } else {
            let cur_devices = username.data().devices;
            req.body.devicename.forEach((device) => {
                cur_devices.push(device);
            });
            db.collection("Customers").doc(req.body.username).set({"devices":cur_devices});
            res.send("successfully added device");
        }
    });

})

module.exports = router;