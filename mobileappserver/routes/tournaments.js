const router = require("express").Router();
const Casino = require("../models/Casino");
const Tournament = require("../models/Tournament")
const checkAuth = require("../middlewares/firebase")


//create a tournament (update casino to add tournament)
router.post("/",checkAuth , async (req, res) => {

  try {

    const casino = await Casino.findById(req.body.casinoId);

    if (casino) {

      const newTournament = new Tournament({
        casinoId: req.body.casinoId,
        date: req.body.date? new Date(req.body.date) : undefined,
        title: req.body.title,
        type: req.body.type, 
        filterDate : req.body.filterDate,
      });
 

      const tournament = await newTournament.save();
      await casino.updateOne({ $push: { tournamentsId: tournament._id } });

      res.status(200).json({
        "msg": "Tournament has been created", "data": tournament
      })

    }
    else {
      res.status(404).json({ "msg": "You need to associate tournament with a casino who exists" });
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
});

// get tournament 
router.get("/tournament/:id", async (req, res) => {

  try {

    projection = {}

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }
    })


    const tournament = await Tournament.findById(req.params.id, projection);

    if (tournament) {

      if (Number(req.query.casinoData) === 1) {

        const casino = await Casino.findById(tournament.casinoId, { name: 1, adresse: 1 });

        if (casino) {

          const data = { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...tournament._doc }

          res.status(200).json({ "msg": "the tournament sought", "data": data });
        }
        else {
          res.status(200).json({ "msg": "the tournament sought, but couldn't access to casino data. Check if you asked casinoId in projection parameters ", "data": tournament });
        }


      }
      else {
        res.status(200).json({ "msg": "the tournament sought", "data": tournament });
      }

    }
    else {
      res.status(404).json({ "msg": "this tournament id doesn't exist" });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

// update tournament; cannot update casinoID 
router.put("/:id",checkAuth , async (req, res) => {

  try {
    const tournament = await Tournament.findById(req.params.id);
    if (tournament) {

      if (req.body.casinoId) {

        res.status(404).json({ "msg": "you cannot change the casino associated with the tournament" });

      }
      else {
        await Tournament.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        res.status(200).json({ "msg": "Tournament has been updated" });

      }

    }
    else {
      res.status(404).json({ "msg": "This Tournament doens't exist" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete a tournament (update casino to remove tournament)
router.delete("/:id",checkAuth , async (req, res) => {


  try {
    const checkTournament = await Tournament.findById(req.params.id);


    if (checkTournament) {

      await Casino.findByIdAndUpdate(checkTournament.casinoId, { $pull: { tournamentsId: req.params.id } });
      await Tournament.findByIdAndDelete(req.params.id);

      const tournament = await Tournament.findById(req.params.id);

      if (!tournament) {
        res.status(200).json({ "msg": "Tournament has been deleted" });
      }
      else {
        res.status(200).json({ "msg": "Tournament hasn't been deleted" });
      }
    }
    else {
      res.status(404).json({ "msg": "This Tournament doens't exist" });
    }

  } catch (err) {

    return res.status(500).json(err);
  }

});

// get all tournament with parameter
router.get("/full/", async (req, res) => {

  try {

    projection = {}

    query = {
      date : { $gt: new Date()}
    }

  

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }

      if (key.substring(0, 2) === "q_") {
        query[key.substring(2,)] = String(value).split(",")
      }


    });

    const tournaments = await Tournament.find(query, projection).sort({date : 1}).skip(req.query.offset).limit(req.query.limit)


    if (Number(req.query.casinoData) === 1) {

      const newTournaments = await Promise.all(tournaments.map(async (machine) => {
        let casino = await Casino.findById(machine.casinoId, { name: 1, adresse: 1 });
        return { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...machine._doc }
      }))

      if (newTournaments) {
        res.status(200).json({ "msg": "all tournaments data", "data": newTournaments });
      }
      else {
        res.status(200).json({ "msg": "all tournaments data, but couldn't access to casino data. Check if you asked casinoId in projection parameters", "data": tournaments });
      }
    }
    else {
      res.status(200).json({ "msg": "all tournaments data", "data": tournaments });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router; 