module.exports = (app) => {
    const metadata = require('../controllers/mme.controller.js');

    // Create a new metadata
    app.post('/mme', metadata.create);

    // Retrieve all metadata
    app.get('/mme', metadata.findAll);

    // Retrieve a single metadata with parenttemplateid
    app.get('/mme/:parenttemplateid', metadata.findOne);

    // Update a metadata with parenttemplateid
    app.put('/mme/:parenttemplateid', metadata.update);

    // Delete a metadata with parenttemplateid
    app.delete('/mme/:parenttemplateid', metadata.delete);
}