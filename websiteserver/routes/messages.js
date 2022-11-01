const express = require('express')
const router = express.Router();
const Message = require("../models/Message")
const Casino = require("../models/Casino")
const checkAuth = require('../middlewares/chechAuth')



// post message

router.post('/message', async(req,res) => {

    try{

        const casino = await Casino.findById(req.body.casinoId)

        if(casino){

            const newMessage = new Message(req.body);
            await newMessage.save();   
            res.status(200).send({msg : "Message has been created", data : newMessage});
          

        }
        else{
            res.status(404).send({msg : "Casino doesn't exit", data : null});
        }

    }
    catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});

// get message by id with projection
router.get('/message/:id', async(req, res) => {
    try{

        projection = {}

        Object.entries(req.query).forEach(([key, value]) => {
          if (key.substring(0, 2) === "p_") {
            projection[key.substring(2,)] = Number(value)
          }
        })
    
        const message = await Message.findById(req.params.id, projection);
    
        if (message) {
          res.status(200).json({ msg: "the message sought", data: message });
        }
        else {
          res.status(404).json({ msg: "this message id doesn't exist" , data : null});
        }

    }
    catch(err){
        res.status(500).send({msg : String(err), data : null});
    }
});

// get all messages with projection and query
router.get('/full/', async(req, res) => {

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
    
    
        const messages = await Message.find(query, projection).sort({date : -1}).skip(req.query.offset).limit(req.query.limit);
        res.status(200).json({ msg: "all messages data", data: messages });

    }catch(err){
        res.status(500).send({msg : String(err), data : null});
    }

});


// update messages by id
router.put('/message/:id',checkAuth, async(req, res) => {

    try {
        const message = await Message.findById(req.params.id);
        if (message) {
          await Message.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          const message = await Message.findById(req.params.id);
          res.status(200).json({ msg: "Message has been updated", data : message });
        }
        else {
          res.status(404).json({ msg: "This message id doens't exist", data : null });
        }
      } catch(err){
        res.status(500).send({msg : String(err), data : null});
    }


});


//delete message by id
router.delete('/message/:id',checkAuth, async(req, res) => {

    try {
        const message = await Message.findById(req.params.id);
    
        if (message) {
     
    
          await Message.findByIdAndDelete(req.params.id); 
          const message = await Message.findById(req.params.id);
    
          if (!message) {
            res.status(200).json({ msg: "message has been deleted" , data : null});
          }
          else {
            res.status(404).json({msg: "message hasn't been deleted", data : null });
          }
        }
        else {
          res.status(404).json({ msg: "This message id doens't exist" , data : null});
        }
    
      } catch (err) {
        res.status(500).send({msg : String(err), data : null});
      }

});





module.exports = router;