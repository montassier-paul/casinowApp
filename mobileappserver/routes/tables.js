const router = require("express").Router();
const Casino = require("../models/Casino");
const Table = require("../models/Table")
const checkAuth = require("../middlewares/firebase")


//create a table (update casino to add table)
router.post("/",checkAuth, async (req, res) => {

  try {

    const casino = await Casino.findById(req.body.casinoId);

    if (casino) {

      const newTable = new Table({
        casinoId: req.body.casinoId,
        open: req.body.open,
        game: req.body.game,
      });


      const table = await newTable.save();
      await casino.updateOne({ $push: { tablesId: table._id } });

      res.status(200).json({
        "msg": "The table has been created", "data": table
      })

    }
    else {
      res.status(404).json({ "msg": "You need to associate a table with a casino who exists" });
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
});

// get table 
router.get("/table/:id", async (req, res) => {

  try {

    projection = {}

    Object.entries(req.query).forEach(([key, value]) => {
      // console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }
    })

    const table = await Table.findById(req.params.id, projection);

    if (table) {

      if (Number(req.query.casinoData) === 1) {

        const casino = await Casino.findById(table.casinoId, { name: 1, adresse: 1 });

        if (casino) {

          const data = { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...table._doc }

          res.status(200).json({ "msg": "the table sought", "data": data });
        }
        else {
          res.status(200).json({ "msg": "the table sought, but couldn't access to casino data. Check if you asked casinoId in projection parameters ", "data": table });
        }


      }
      else {
        res.status(200).json({ "msg": "the table sought", "data": table });
      }
    }
    else {
      res.status(404).json({ "msg": "this table id doesn't exist" });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});

// update table; cannot update casinoID 
router.put("/:id",checkAuth , async (req, res) => {

  try {
    const table = await Table.findById(req.params.id);
    if (table) {

      if (req.body.casinoId) {

        res.status(404).json({ "msg": "you cannot change the casino associated with the table" });

      }
      else {
        await Table.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        res.status(200).json({ "msg": "table has been updated" });

      }

    }
    else {
      res.status(404).json({ "msg": "This table doens't exist" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete a table (update casino to remove table)
router.delete("/:id",checkAuth , async (req, res) => {


  try {
    const checkTable = await Table.findById(req.params.id);


    if (checkTable) {

      await Casino.findByIdAndUpdate(checkTable.casinoId, { $pull: { tablesId: req.params.id } });
      await Table.findByIdAndDelete(req.params.id);

      const table = await Table.findById(req.params.id);

      if (!table) {
        res.status(200).json({ "msg": "table has been deleted" });
      }
      else {
        res.status(200).json({ "msg": "table hasn't been deleted" });
      }
    }
    else {
      res.status(404).json({ "msg": "This table doens't exist" });
    }

  } catch (err) {

    return res.status(500).json(err);
  }

});

// get all table with parameter
router.get("/full/", async (req, res) => {

  try {

    projection = {}
    query = {}

    // Update header text

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }

      if (key.substring(0, 2) === "q_") {
        query[key.substring(2,)] = String(value).split(",")
      }


    });

    const tables = await Table.find(query, projection).skip(req.query.offset).limit(req.query.limit);



    if (Number(req.query.casinoData) === 1) {

      const newTables = await Promise.all(tables.map(async (table) => {
        let casino = await Casino.findById(table.casinoId, { name: 1, adresse: 1 });
        return { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...table._doc }
      }))

      if (newTables) {
        res.status(200).json({ "msg": "all tables data", "data": newTables });
      }
      else {
        res.status(200).json({ "msg": "all tables data, but couldn't access to casino data. Check if you asked casinoId in projection parameters", "data": tables });
      }
    }
    else {
      res.status(200).json({ "msg": "all tables data", "data": tables });
    }


  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router; 