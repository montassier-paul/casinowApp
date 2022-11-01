const mongoose = require("mongoose");

const CasinoSchema = new mongoose.Schema(
    {
      name : {
        type : String,  
        required : true,
      },

      adresse : {
        type : String, 
        required : true,
      }, 

      region : {
        type : String, 
      },

      groupe : {
        type : String, 
      },

      departement : {
        type : String, 
      },

      ville : {
        type : String, 
      },

      machines : {
        type : Number, 
      },

      tables : {
        type : Number, 
      },

      restaurant : {
        type : Boolean, 
      },

      betting : {
        type : Boolean, 
      },

      poker : {
        type : Boolean,  
      },

      hotel : {
        type : Boolean, 
      },

      parking : {
        type : Boolean, 
      },

      desc : {
        type : String, 
      },

      images : {
        type : [String], 
        default : []
      }, 

      tournamentsId : {
        type :[String], 
        default: [],
      },

      tablesId : {
        type : [String], 
        default: [],
      },

      trendsId : {
        type : [String], 
        default: [],
      },

      eventsId : {
        type : [String], 
        default: [],
      },

      machinesId : {
        type : [String], 
        default: [],
      },

      hours : {
        type : [], 
        default : [
          {day : "Monday", opening : "00:00", ending :  "00:00"},
          {day : "Tuesday", opening :  "00:00", ending :  "00:00"}, 
          {day : "Wednesday", opening :  "00:00", ending :  "00:00"}, 
          {day : "Thursday", opening :  "00:00", ending :  "00:00"}, 
          {day : "Friday", opening :  "00:00", ending :  "00:00"}, 
          {day : "Saturday", opening :  "00:00", ending :  "00:00"},  
          {day : "Sunday", opening :  "00:00", ending :  "00:00"}, 
          
        ]
      },

      games : {
        type: [], 
        default : [
        ]

      },

    },
    { timestamps: true }
  );
  
const Casino = mongoose.model("Casino", CasinoSchema);

module.exports = Casino;
