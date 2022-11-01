const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CasinoSchema = new Schema({
  nom: {
    type: String,
    required: true
  },

  adresse: {
    type: String,
  },

  region: {
    type: String,
  },

  ville: {
    type: String,
  },

  departement: {
    type: String,
  },

  groupe: {
    type: String,
  },

  link: {
    type: String,
  },

  machines_nombre: {
    type: Number,
  },

  tables_nombre: {
    type: Number,
  },

  longitude: {
    type: Number,
  },

  latitude: {
    type: Number,
  },

  jeux: {
    type: [{nom : String, type : "machine"|"table"|null, desc : String|null, nombre : Number}],
    default : []
  },

  horaires: {
    type:  [{jour : String, ouverture : String, fermeture : String}], 
    default : [{jour : "Lundi", ouverture : "00:00", fermeture : "00:00"},
    {jour : "Mardi", ouverture : "00:00", fermeture : "00:00"},
    {jour : "Mercredi", ouverture : "00:00", fermeture : "00:00"},
    {jour : "Jeudi", ouverture : "00:00", fermeture : "00:00"},
    {jour : "Vendredi", ouverture : "00:00", fermeture : "00:00"},
    {jour : "Samedi", ouverture : "00:00", fermeture : "00:00"},
    {jour : "Dimanche", ouverture : "00:00", fermeture : "00:00"},]
  },

  images: {
    type: [String],
    default : []
  },

  poker: {
    type: Boolean,
  },

  paris: {
    type: Boolean,
  },

  hotel: {
    type: Boolean,
  },

  restaurant: {
    type: Boolean,
  },

  parking: {
    type: Boolean,
  },

  desc: {
    type: String,
  },

  score : {
    type : {somme : Number, votes : Number}, 
    default : {somme : 0, votes : 0}
  }
  
  },

  { timestamps: true }
);

module.exports = Casino = mongoose.model('Casino', CasinoSchema);

