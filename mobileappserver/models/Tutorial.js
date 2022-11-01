const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema(
    {
      desc : {
        type : String, 
      },

      img : {
        type : String, 
      },

      video : {
        type : String, 
      },

      game : {
        type : String, 
        required : true
      },

      type : {
        type : String, 
      },



    },
    { timestamps: true }
  );
  
const Tutorial = mongoose.model("Tutorial", TutorialSchema);

module.exports = Tutorial;