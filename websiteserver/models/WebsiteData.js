const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebsiteDataSchema = new Schema({


  homePageBand : {

    type : [{image : String, texte : String, position : 'left' | 'center' | 'right'}], 
    default: []
  },

  conditions : {
    type : String, 
    default: ''
  },

  learnGames : {
    type : [{titre : {type : String, unique: true}, contenu : String}], 
    default : []
  },  

  
  },

  { timestamps: true }
);

module.exports = WebsiteData = mongoose.model('WebsiteData', WebsiteDataSchema);

