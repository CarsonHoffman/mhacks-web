var mongoose = require('../index.js'),
    config = require('../../../config/default.js');

// Define the document Schema
var schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        domain: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ['bronze', 'silver', 'gold', 'unobtanium'],
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        logo_size: {
            type: String,
            enum: ['small', 'medium', 'large'],
            required: true
        },
        url: {
            type: String
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

// Allow us to query by name
schema.query.byName = function(name) {
    return this.findOne({
        name: new RegExp(name, 'i')
    });
};

// Allow us to query by email
schema.query.byLevel = function(level) {
    return this.findOne({
        level: new RegExp(level, 'i')
    });
};

schema.virtual('logo_url').get(function() {
    return config.host + '/v1/sponsor/logo/' + this.id;
});

// Initialize the model with the schema, and export it
var model = mongoose.model('Sponsor', schema);

module.exports = model;