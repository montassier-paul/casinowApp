const router = require("express").Router();
const Casino = require("../models/Casino");
const Evenement = require("../models/Evenement")
const checkAuth = require("../middlewares/firebase")



//create a evenement (update casino to add evenement)
router.post("/",checkAuth, async (req, res) => {

  try {

    const casino = await Casino.findById(req.body.casinoId);

    if (casino) {

      const newEvenement = new Evenement({
        casinoId: req.body.casinoId,
        date: new Date(req.body.date),
        title : req.body.title, 
        month : req.body.month
      });


      const evenement = await newEvenement.save();
      await casino.updateOne({ $push: { eventsId: evenement._id } });

      res.status(200).json({
        "msg": "The evenement has been created", "data": evenement
      })

    }
    else {
      res.status(404).json({ "msg": "You need to associate an evenement with a casino who exists" });
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
});
 
// get evenement 
router.get("/evenement/:id", async (req, res) => {

  try {

    projection = {}

    Object.entries(req.query).forEach(([key, value]) => {
      // console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }
    })


    const evenement = await Evenement.findById(req.params.id, projection);

    if (evenement) {
      if (Number(req.query.casinoData) === 1) {

        const casino = await Casino.findById(evenement.casinoId, { name: 1, adresse: 1 });

        if (casino) {

          const data = { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...evenement._doc }

          res.status(200).json({ "msg": "the evenement sought", "data": data });
        }
        else {
          res.status(200).json({ "msg": "the evenement sought, but couldn't access to casino data. Check if you asked casinoId in projection parameters ", "data": evenement });
        }


      }
      else {
        res.status(200).json({ "msg": "the evenement sought", "data": evenement });
      }
    
      
    }
    else {
      res.status(404).json({ "msg": "this evenement id doesn't exist" });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

// update evenement; cannot update casinoID 
router.put("/:id",checkAuth, async (req, res) => {

  try {
    const evenement = await Evenement.findById(req.params.id);
    if (evenement) {

      if (req.body.casinoId) {

        res.status(404).json({ "msg": "you cannot change the casino associated with the evenement" });

      }
      else {
        await Evenement.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        res.status(200).json({ "msg": "evenement has been updated" });

      }

    }
    else {
      res.status(404).json({ "msg": "This evenement doens't exist" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete a evenement (update casino to remove evenement)
router.delete("/:id",checkAuth, async (req, res) => {


  try {
    const checkEvenement = await Evenement.findById(req.params.id);


    if (checkEvenement) {

      await Casino.findByIdAndUpdate(checkEvenement.casinoId, { $pull: { eventsId: req.params.id } });
      await Evenement.findByIdAndDelete(req.params.id);

      const evenement = await Evenement.findById(req.params.id);

      if (!evenement) {
        res.status(200).json({ "msg": "evenement has been deleted" });
      }
      else {
        res.status(200).json({ "msg": "evenement hasn't been deleted" });
      }
    }
    else {
      res.status(404).json({ "msg": "This evenement doens't exist" });
    }

  } catch (err) {

    return res.status(500).json(err);
  }

});

// get all evenement with parameter
router.get("/full/", async (req, res) => {

  try {

    projection = {
      
    }

    query = {
      date : { $gt: new Date()}
    }


    // Update header text

    Object.entries(req.query).forEach(([key, value]) => {
      // console.log(key, value);
      if (key.substring(0,2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }

      if (key.substring(0,2) === "q_") {
        query[key.substring(2,)] = String(value).split(",")
      }


    });



    const evenements = await Evenement.find(query, projection).sort({date : 1}).skip(req.query.offset).limit(req.query.limit)

    
    if (Number(req.query.casinoData) === 1) {

      const newEvenements = await Promise.all(evenements.map(async (machine) => {
        let casino = await Casino.findById(machine.casinoId, { name: 1, adresse: 1 });
        return { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...machine._doc }
      }))

      if (newEvenements) {
        res.status(200).json({ "msg": "all evenements data", "data": newEvenements });
      }
      else {
        res.status(200).json({ "msg": "all evenements data, but couldn't access to casino data. Check if you asked casinoId in projection parameters", "data": evenements });
      }
    }
    else {
      res.status(200).json({ "msg": "all evenements data", "data": evenements });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router; 