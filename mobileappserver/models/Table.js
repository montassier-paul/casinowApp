const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
    {
      casinoId : {
        type : String, 
        required : true,
      },

      open : {
        type : Boolean, 
        required : true,
      },

      game : {
        type :  String, 
        required : true,
      },

    },
    { timestamps: true }
  );
  
const Table = mongoose.model("Table", TableSchema);

module.exports = Table;