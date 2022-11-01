const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema(
    {
      desc : {
        type : String, 
      },

      img : {
        type : String, 
      },

      date : {
        type : String, 
        required : true,  
      },

      title : {
        type : String,
        required : true,  
      },

      casinoId : {
        type : String, 
        required : true,
      },

    },
    { timestamps: true }
  );
  
const Trend = mongoose.model("Trend", TrendSchema);

module.exports = Trend;