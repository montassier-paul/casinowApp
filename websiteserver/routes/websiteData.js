const express = require('express')
const router = express.Router();
const WebsiteData = require("../models/WebsiteData")
const checkAuth = require('../middlewares/chechAuth')


// create website data
router.post('/', checkAuth, async(req,res) => {

    try{

        const data = await WebsiteData.find({})
        
        if(!data.length){

            const newData = new WebsiteData();
            await newData.save();   
            res.status(200).send({msg : "Website data has been created", data : newData});
          

        }
        else{
            res.status(404).send({msg : "Website data already exist", data : data});
        }

    }
    catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});


// get website data with projection
router.get('/', async(req, res) => {

    try{

        projection = {}

        Object.entries(req.query).forEach(([key, value]) => {
          if (key.substring(0, 2) === "p_") {
            projection[key.substring(2,)] = Number(value)
          }
        })
    
        const data = await WebsiteData.find(projection);
    
        if (data.length) {
          res.status(200).json({ msg: "the website data", data: data[0] });
        }
        else {
          res.status(404).json({ msg: "there is not website data on the server" , data : null});
        }

    }
    catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});


// // update website data
router.put('/',  checkAuth , async(req, res) => {

    try {
        const data = await WebsiteData.find({})

        if (data.length) {
            
          await WebsiteData.findByIdAndUpdate(data[0]._id, {
            $set: req.body,
          });
          const updatedData = await WebsiteData.find({});
          res.status(200).json({ msg: "Website data has been updated", data : updatedData[0] });
        }
        else {
          res.status(404).json({ msg: "There is not website data", data : null });
        }
      } catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});



//delete website data 
router.delete('/', checkAuth,  async(req, res) => {

    try {
        const data = await WebsiteData.find({});


    
        if (data.length) {

    
          await WebsiteData.findByIdAndDelete(data[0]._id); 
          const checkData = await WebsiteData.find({});
    
          if (!checkData.lenghth) {
            res.status(200).json({ msg: "data has been deleted" });
          }
          else {
            res.status(404).json({ "msg": "data hasn't been deleted" });
          }
        }
        else {
          res.status(404).json({ "msg": "There is no website data" });
        }
    
      } catch (err) {
        res.status(500).send({msg : String(err), data : null});
      }

});





module.exports = router;