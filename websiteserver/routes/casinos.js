const express = require('express')
const router = express.Router();
const Casino = require("../models/Casino")
const checkAuth = require('../middlewares/chechAuth')
// post casino

router.post('/casino', checkAuth, async(req,res) => {

    // console.log(req.body)
    

    try{

        const casino = await Casino.findOne({nom : req.body.nom})
        
        if(!casino){

            const newCasino = new Casino(req.body);
            await newCasino.save();   
            res.status(200).send({msg : "Casino has been created", data : newCasino});
          

        }
        else{
            res.status(404).send({msg : "Casino already exist", data : null});
        }

    }
    catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});

// get casino by id with projection

router.get('/casino/:id', async(req, res) => {

    try{

        projection = {}

        Object.entries(req.query).forEach(([key, value]) => {
          if (key.substring(0, 2) === "p_") {
            projection[key.substring(2,)] = Number(value)
          }
        })
    
        const casino = await Casino.findById(req.params.id, projection);
    
        if (casino) {
          res.status(200).json({ msg: "the casino sought", data: casino });
        }
        else {
          res.status(404).json({ msg: "this casino id doesn't exist" , data : null});
        }

    }
    catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});

// get all casino with projection and query
router.get('/full', async(req, res) => {

    try{

        projection = {}
        query = {}
    
    
        Object.entries(req.query).forEach(([key, value]) => {
          // console.log(key, value);
          if (key.substring(0, 2) === "p_") {
            projection[key.substring(2,)] = Number(value)
          }
    
          if (key.substring(0, 2) === "q_") {
            query[key.substring(2,)] = String(value).split(",")
          }
    
    
        });
    
    
        const casinos = await Casino.find(query, projection).skip(req.query.offset).limit(req.query.limit);
        res.status(200).json({ msg: "all casinos data", data: casinos });

    }catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});


// update casino by id
router.put('/casino/:id',  checkAuth , async(req, res) => {

    try {
        const casino = await Casino.findById(req.params.id);
        if (casino) {
          await Casino.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          const casino = await Casino.findById(req.params.id);
          res.status(200).json({ msg: "Casino has been updated", data : casino });
        }
        else {
          res.status(404).json({ msg: "This casino doens't exist", data : null });
        }
      } catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});

// vote
router.put('/vote/:id', async(req, res) => {

    try {
        const casino = await Casino.findById(req.params.id);
        let condition = (req.body.score < 0 | req.body.score > 5)
        
        if (casino && !condition) {

            let casino = await Casino.findById(req.params.id);

            await Casino.findByIdAndUpdate(req.params.id, {
                score : {somme : casino.score.somme + req.body.score, votes : casino.score.votes + 1},
              });

            casino = await Casino.findById(req.params.id);
    
            res.status(200).json({ msg: "Casino has been updated", data : casino});
         
        }
        else if (condition){
            res.status(404).json({ msg: "Vote should be between 0 and 5 ", data : null });
        }
        else {
          res.status(404).json({ msg: "This casino doens't exist", data : null });
        }
      } catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});

//delete casino by id



router.delete('/casino/:id', checkAuth,  async(req, res) => {

    try {
        const casino = await Casino.findById(req.params.id);
    
        if (casino) {
     
    
          await Casino.findByIdAndDelete(req.params.id); 
          const casino = await Casino.findById(req.params.id);
    
          if (!casino) {
            res.status(200).json({ msg: "casino has been deleted" });
          }
          else {
            res.status(404).json({ "msg": "casino hasn't been deleted" });
          }
        }
        else {
          res.status(404).json({ "msg": "This casino doens't exist" });
        }
    
      } catch (err) {
        res.status(500).send({msg : String(err), data : null});
      }

});





module.exports = router;