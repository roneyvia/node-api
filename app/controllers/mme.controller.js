const MME = require('../models/mme.model.js');

// Create and Save a new Metadata
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Metadata content can not be empty"
        });
    }

    // Create a Metadata
    const metadata = new MME({
        partyid : req.body.partyid,
        templatetype : req.body.templatetype,
        templateid : req.body.templateid,
        templatename : req.body.templatename,
        templatefield : req.body.templatefield,
        hierarchyname : req.body.hierarchyname,
        levelname : req.body.levelname,
        levelvalue : req.body.levelvalue,
        variableid : req.body.variableid,
        variableshortcode : req.body.variableshortcode,
        parenttemplateid : req.body.parenttemplateid,
        variablecode : req.body.variablecode,
        displayname : req.body.displayname,
        displaytype : req.body.displaytype,
        displayorder : req.body.displayorder,
        nested : req.body.nested,
        createddate : req.body.createddate,
        modifieddate : req.body.modifieddate,
        width : req.body.width,
        hidden : req.body.hidden,
        readonly : req.body.readonly,
        listeditable : req.body.listeditable
    });

    // Save Metadata in the database
    metadata.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Metadata."
        });
    });
};

// Retrieve and return all Metadata from the database.
exports.findAll = (req, res) => {
    MME.find().then(metadata => {
        res.send(metadata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Metadata."
        });
    });
};

// Find a Metadata with conditions
exports.findOne = (req, res) => {
    let query = {$and:[{parenttemplateid: 1450}, {partyid: 1}, {displayname: "Opportunity Status"}, {levelname: "OpportunityRegistration"}]};
    MME.find(query).then(metadata => {
        if(!metadata) {
            return res.status(404).send({
                message: "Metadata not found with parenttemplateid " + req.params.parenttemplateid
            });            
        }
        res.send(metadata);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Metadata not found with parenttemplateid " + req.params.parenttemplateid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with parenttemplateid " + req.params.parenttemplateid
        });
    });
};

// Update a Metadata identified by the parenttemplateid in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Metadata content can not be empty"
        });
    }

    // Find metadata and update it with the request body
    MME.findByIdAndUpdate(req.params.parenttemplateid, {
        partyid : req.body.partyid,
        templatetype : req.body.templatetype,
        templateid : req.body.templateid,
        templatename : req.body.templatename,
        templatefield : req.body.templatefield,
        hierarchyname : req.body.hierarchyname,
        levelname : req.body.levelname,
        levelvalue : req.body.levelvalue,
        variableid : req.body.variableid,
        variableshortcode : req.body.variableshortcode,
        parenttemplateid : req.body.parenttemplateid,
        variablecode : req.body.variablecode,
        displayname : req.body.displayname,
        displaytype : req.body.displaytype,
        displayorder : req.body.displayorder,
        nested : req.body.nested,
        createddate : req.body.createddate,
        modifieddate : req.body.modifieddate,
        width : req.body.width,
        hidden : req.body.hidden,
        readonly : req.body.readonly,
        listeditable : req.body.listeditable
    }, {new: true}).then(metadata => {
        if(!metadata) {
            return res.status(404).send({
                message: "Metadata not found with parenttemplateid " + req.params.parenttemplateid
            });
        }
        res.send(metadata);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Metadata not found with parenttemplateid " + req.params.parenttemplateid
            });                
        }
        return res.status(500).send({
            message: "Error updating Metadata with parenttemplateid " + req.params.parenttemplateid
        });
    });
};

// Delete a Metadata with the specified parenttemplateid in the request
exports.delete = (req, res) => {
    MME.findByIdAndRemove(req.params.parenttemplateid).then(metadata => {
        if(!metadata) {
            return res.status(404).send({
                message: "Metadata not found with parenttemplateid " + req.params.parenttemplateid
            });
        }
        res.send({message: "Metadata deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Metadata not found with parenttemplateid " + req.params.parenttemplateid
            });                
        }
        return res.status(500).send({
            message: "Could not delete Metadata with parenttemplateid " + req.params.parenttemplateid
        });
    });
};