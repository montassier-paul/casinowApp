const router = require("express").Router();
const Casino = require("../models/Casino");
const Trend = require("../models/Trend")
const checkAuth = require("../middlewares/firebase")


//create a Trend (update casino to add Trend)
router.post("/",checkAuth , async (req, res) => {

    try {

        const casino = await Casino.findById(req.body.casinoId); 

        if (casino){

            const newTrend = new Trend({
                casinoId: req.body.casinoId,
                title : req.body.title,
            });
    
        
            const trend = await  newTrend.save();
            await casino.updateOne({ $push: { trendsId: trend._id } });

            res.status(200).json({"msg" : "The trend has been created", "data" : trend 
            })

        }
        else {
            res.status(404).json({"msg" : "You need to associate a trend with a casino who exists"});
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
  });

// get trend 
router.get("/trend/:id", async (req, res) => {

  try {

    projection = {}

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key.substring(0, 2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }
    })


    const trend = await Trend.findById(req.params.id, projection);

    if (trend) {
      if (Number(req.query.casinoData) === 1) {

        const casino = await Casino.findById(trend.casinoId, { name: 1, adresse: 1 });

        if (casino) {

          const data = { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...trend._doc }

          res.status(200).json({ "msg": "the trend sought", "data": data });
        }
        else {
          res.status(200).json({ "msg": "the trend sought, but couldn't access to casino data. Check if you asked casinoId in projection parameters ", "data": trend });
        }


      }
      else {
        res.status(200).json({ "msg": "the trend sought", "data": trend });
      }
    
      
    }
    else {
      res.status(404).json({ "msg": "this trend id doesn't exist" });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});


// update trend; cannot update casinoID 
router.put("/:id",checkAuth , async (req, res) => {

    try {
      const trend = await Trend.findById(req.params.id);
      if (trend){

        if(req.body.casinoId){

            res.status(404).json({"msg" : "you cannot change the casino associated with the trend"});

        }
        else{
            await Trend.findByIdAndUpdate(req.params.id, {
                $set: req.body,
                });
        
            res.status(200).json({"msg" : "trend has been updated"});

        }
       
      }
      else{
        res.status(404).json({"msg" :"This trend doens't exist"});
      }
    } catch (err) {
    return res.status(500).json(err);
    }
  });

// delete a trend (update casino to remove Trend)
router.delete("/:id",checkAuth ,async (req, res) => {

   
    try {
        const checkTrend = await Trend.findById(req.params.id);
        

        if(checkTrend) {
            
            await Casino.findByIdAndUpdate(checkTrend.casinoId,{$pull: { trendsId: req.params.id } });
            await Trend.findByIdAndDelete(req.params.id);
            
            const trend = await Trend.findById(req.params.id);

            if (!trend){
                res.status(200).json({"msg" : "trend has been deleted"});
            }
            else {
                res.status(200).json({"msg" : "trend hasn't been deleted"});
            }
        }
        else{
            res.status(404).json({"msg" :"This trend doens't exist"});
        }

    } catch (err) {

        return res.status(500).json(err);
    }

  });

// get all trend with parameter 
router.get("/full/", async (req, res) => {

  try {

    projection = {}
    query = {}

    // Update header text

    Object.entries(req.query).forEach(([key, value]) => {
      console.log(key, value);
      if (key.substring(0,2) === "p_") {
        projection[key.substring(2,)] = Number(value)
      }

      if (key.substring(0,2) === "q_") {
        query[key.substring(2,)] = String(value).split(",")
      }


    });

    const trends = await Trend.find(query, projection).skip(req.query.offset).limit(req.query.limit);
    
    if (Number(req.query.casinoData) === 1) {

      const newTrends = await Promise.all(trends.map(async (machine) => {
        let casino = await Casino.findById(machine.casinoId, { name: 1, adresse: 1 });
        return { ...{ CasinoName: casino.name, CasinoAdresse: casino.adresse }, ...machine._doc }
      }))

      if (newTrends) {
        res.status(200).json({ "msg": "all trends data", "data": newTrends });
      }
      else {
        res.status(200).json({ "msg": "all trends data, but couldn't access to casino data. Check if you asked casinoId in projection parameters", "data": trends });
      }
    }
    else {
      res.status(200).json({ "msg": "all trends data", "data": trends });
    }

  } catch (err) {

    res.status(500).json(err);
  }
});


module.exports = router; 