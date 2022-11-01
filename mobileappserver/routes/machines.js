const router = require("express").Router();
const Casino = require("../models/Casino");
const Machine = require("../models/Machine")
const checkAuth = require("../middlewares/firebase")





//create a machine (update casino to add machine)
router.post("/",checkAuth, async (req, res) => {

  try {

    const casino = await Casino.findById(req.body.casinoId);

    if (casino) {

      const newMachine = new Machine({
        casinoId: req.body.casinoId,
        jackpot: req.body.jackpot,
        game: req.body.game,
      });


      const machine = await newMachine.save();
      await casino.updateOne({ $push: { machinesId: machine._id } });

      res.status(200).json({
        "msg": "The machine has been created", "data": machine
      })

    }
    else {
      res.status(404).json({ "msg": "You need to associate an machine with a casino who exists" });
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
});

// get machine 
router.get("/machine/:id", async (req, res) => {

  try {

    projection = {}

    Object.entries(req.query).forEach(([key, value]) => {
      // console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }
    })

    const machine = await Machine.findById(req.params.id, projection);


    if (machine) {

      if (Number(req.query.casinoData) === 1) {

        const casino = await Casino.findById(machine.casinoId, { name: 1, adresse: 1 });

        if (casino) {

          const data = { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...machine._doc }

          res.status(200).json({ "msg": "the machine sought", "data": data });
        }
        else {
          res.status(200).json({ "msg": "the machine sought, but couldn't access to casino data. Check if you asked casinoId in projection parameters ", "data": machine });
        }


      }
      else {
        res.status(200).json({ "msg": "the machine sought", "data": machine });
      }

    }
    else {
      res.status(404).json({ "msg": "this machine id doesn't exist" });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

// update machine; cannot update casinoID 
router.put("/:id",checkAuth, async (req, res) => {

  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {

      if (req.body.casinoId) {

        res.status(404).json({ "msg": "you cannot change the casino associated with the machine" });

      }
      else {
        await Machine.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        res.status(200).json({ "msg": "machine has been updated" });

      }

    }
    else {
      res.status(404).json({ "msg": "This machine doens't exist" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete a Machine (update casino to remove machine)
router.delete("/:id",checkAuth, async (req, res) => {


  try {
    const checkMachine = await Machine.findById(req.params.id);


    if (checkMachine) {

      await Casino.findByIdAndUpdate(checkMachine.casinoId, { $pull: { machinesId: req.params.id } });
      await Machine.findByIdAndDelete(req.params.id);

      const machine = await Machine.findById(req.params.id);

      if (!machine) {
        res.status(200).json({ "msg": "machine has been deleted" });
      }
      else {
        res.status(200).json({ "msg": "machine hasn't been deleted" });
      }
    }
    else {
      res.status(404).json({ "msg": "This machine doens't exist" });
    }

  } catch (err) {

    return res.status(500).json(err);
  }

});

// get all Machine with parameter
router.get("/full/", async (req, res) => {

  try {
    projection = {}
    query = {}

    // Update header text

    Object.entries(req.query).forEach(([key, value]) => {
      // console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }

      if (key.substring(0, 2) === "q_") {
        query[key.substring(2,)] = String(value).split(",")

      }

    })



    const machines = await Machine.find(query, projection).sort({ jackpot: -1 }).skip(req.query.offset).limit(req.query.limit);

    if (Number(req.query.casinoData) === 1) {

      const newMachines = await Promise.all(machines.map(async (machine) => {
        let casino = await Casino.findById(machine.casinoId, { name: 1, adresse: 1 });
        return { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...machine._doc }
      }))

      if (newMachines) {
        res.status(200).json({ "msg": "all Machines data", "data": newMachines });
      }
      else {
        res.status(200).json({ "msg": "all Machines data, but couldn't access to casino data. Check if you asked casinoId in projection parameters", "data": machines });
      }
    }
    else {
      res.status(200).json({ "msg": "all Machines data", "data": machines });
    }







  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router; 