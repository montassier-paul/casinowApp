const router = require("express").Router();
const User = require("../models/User")
const Casino = require("../models/Casino")



//create user 
router.post("/", async (req, res) => {

  try {

 

    const user =  await User.findOne({numTel : req.body.numTel});

  

    if (!user) {

      const newUser = new User({
        numTel: req.body.numTel,
        firstName: req.body.firstName,
        familyName : req.body.familyName, 
        followings : req.body.following
    });

      const user =  await newUser.save();

      res.status(200).json({
        "msg": "User has been created ", "data": user
      })

    }
    else {
      res.status(404).json({ "msg": "User already exist" });
    }

  }
  catch (err) {
    res.status(500).json(err)
  }
});
 
// get user by tel
router.get("/user/:numTel", async (req, res) => {

  try {

    const user = await User.findOne({numTel : req.params.numTel});


    if(user){

        res.status(200).json({
            "msg": "User sought ", "data": user
          })

    }
    else{

        res.status(404).json({
            "msg": "No user with this tel Number exists", "data": user
          })

    }


  } catch (err) {

    res.status(500).json(err);
  }
});

// update user
router.put("/:numTel", async (req, res) => {

  try {
    const user = await User.findOne({numTel : req.params.numTel});

    if (user) {

      
        await User.findOneAndUpdate({numTel : req.params.numTel}, {
          $set: req.body,
        });

        res.status(200).json({ "msg": "User updated" });

    }
    else {
      res.status(404).json({ "msg": "This user doens't exist" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update user
router.put("/followings/:numTel", async (req, res) => {

    try {
      const user = await User.findOne({numTel : req.params.numTel});
      
      if (user) {

          if(!user.followings.includes(req.body.following)){

            await user.updateOne({ $push: { followings: req.body.following } });

            res.status(200).json({ "msg": "followings added" });
          }
          else{

            await user.updateOne({ $pull: { followings: req.body.following } });

            res.status(200).json({ "msg": "followings removed" });
          }
  
  
      }
      else {
        res.status(404).json({ "msg": "This user doens't exist" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

// delete a user
router.delete("/:numTel", async (req, res) => {


  try {
    const user = await User.findOne({numTel : req.params.numTel});


    if (user) {

      await User.findOneAndDelete({numTel : req.params.numTel});

      const stillUser = await User.findOne({numTel : req.params.numTel});

      if (!stillUser) {
        res.status(200).json({ "msg": "User has been deleted" });
      }
      else {
        res.status(200).json({ "msg": "User hasn't been deleted" });
      }
    }
    else {
      res.status(404).json({ "msg": "This User doens't exist" });
    }

  } catch (err) {

    return res.status(500).json(err);
  }

});

// for casinoId get all telephone
router.get("/full/:casinoId", async (req, res) => {


    try {

      const casino = await Casino.findById(req.params.casinoId);


      if(casino){

        const numTel = await User.find({followings : req.params.casinoId}, {numTel : 1})
        .then((data) => data.map((content) => {return "+33" + String(content.numTel)}));


        res.status(200).json({
          "msg": "List of users' tel numbers followings this casinos", "data": numTel
        })

      }
      else {

        res.status(200).json({
          "msg": "This casino doesn't exist "
        })

      }
      
  
  
        
    } catch (err) {
  
      return res.status(500).json(err);
    }
  
  });


module.exports = router; 