const router = require("express").Router();
const Administrator = require("../models/Administrator");
const Casino = require("../models/Casino");
const checkAuth = require("../middlewares/firebase")


//create a casino
router.post("/", checkAuth, async (req, res) => {


    try {
        const admin = await Administrator.findOne({ mail: req.body.mail });
        const casino = await Casino.findById(req.body.casinoId);

        if (admin) {
            res.status(404).json("This admin does exist in the database")
        } 
        else if(!casino) {
            res.status(404).json("This casino Id  does exist in the database")
        }
        else {
            const newAdmin = new Administrator({
                mail: req.body.mail,
                casinoId: req.body.casinoId,
            });


            const admin = await newAdmin.save();
            res.status(200).json({
                "msg": "Administrator has been created", "data": admin
            })

        }
    } catch (err) {
        res.status(500).json(err)
    }
});

// get admin by mail
router.get("/:mail",checkAuth,  async (req, res) => {

    try {

        const admin = await Administrator.findOne({ mail: req.params.mail });
        if(admin){
            res.status(200).json({
                "msg": "Data sought", "data": admin
            })
        }
        else{
            res.status(404).json("This admin does exist in the database")
        }


    } catch(err) {
        res.status(500).json(err)
    }

});




// update a admin
router.put("/:mail",checkAuth, async (req, res) => {

    try {
        const admin = await Administrator.findOne({mail: req.params.mail });
        if (admin) {
            await Administrator.findOneAndUpdate({mail: req.params.mail }, {
                $set: req.body,
            });

            res.status(200).json({ "msg": "Admin has been updated" });
        }
        else {
            res.status(404).json({ "msg": "This admin doens't exist" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// delete a admin by mail
router.delete("/:mail",checkAuth, async (req, res) => {


    try {
        const admin = await Administrator.findById({mail: req.params.mail });

        if (admin) {

    


            await Administrator.findOneAndDelete({mail: req.params.mail });

            const checkCasino = await Administrator.findOne({mail: req.params.mail });

            if (!checkCasino) {
                res.status(200).json({ "msg": "admin has been deleted" });
            }
            else {
                res.status(200).json({ "msg": "admin hasn't been deleted" });
            }
        }
        else {
            res.status(404).json({ "msg": "This admin doens't exist" });
        }

    } catch (err) {
        return res.status(500).json(err);
    }

});



module.exports = router; 