const mongoose = require('mongoose');

const MMESchema = mongoose.Schema({
    partyid : Number,
    templatetype : String,
    templateid : Number,
    templatename : String,
    templatefield : String,
    hierarchyname : String,
    levelname : String,
    levelvalue : String,
    variableid : Number,
    variableshortcode : String,
    parenttemplateid : Number,
    variablecode : String,
    displayname : String,
    displaytype : String,
    displayorder : Number,
    nested : Number,
    createddate : String,
    modifieddate : String,
    width : String,
    hidden : Number,
    readonly : Number,
    listeditable : Number

}, {
    timestamps: true
});
var collection = 'MME_METADATA'
module.exports = mongoose.model('MME', MMESchema, collection);