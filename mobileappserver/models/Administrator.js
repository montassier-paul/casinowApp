const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema(
    {
      mail : {
        type : String, 
        required : true, 
        unique : true,
      },

      casinoId : {
        type : String, 
        required : true, 
        unique : true
      }    

    },
    { timestamps: true }
  );
  
const Administrator = mongoose.model("Admin", AdministratorSchema);

module.exports = Administrator; 