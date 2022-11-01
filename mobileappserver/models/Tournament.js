const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema(
    {
      desc : {
        type : String, 
      },

      title : {
        type : String, 
        required : true, 
      },

      img : {
        type : String, 
      },

      type : {
        type : String,
        enum : ["regular", "exceptional"], 
        required : true
      }, 

      filterDate : {
        type : String, 
        enum : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday","January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"], 
        required : true,
      }, 

      blind : {
        type : Number, 
      },

      casinoId : {
        type : String, 
        required : true,
      },

      date : {
        type : Date, 
        required : true,
        default : new Date(8640000000000000), 
      },

      opening : {
        type :  String,
      },

      ending : {
        type :  String,
      }

    },
    { timestamps: true }
  );
  
const Tournament = mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;