/**
 * Module dependencies
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var util = require('util');
var _ = require('lodash');


/**
 * Update Multiple Records
 *
 * An API call to update a model instance with the specified `id`,
 * treating the other unbound parameters as attributes.
 *
 * @param {Array} Every item should contain an id  - the unique id of the particular record you'd like to update  (Note: this param should be specified even if primary key is not `id`!!)
 *
 */
module.exports = function updateMultipleRecords(req, res) {
    var Model;

    Model = actionUtil.parseModel(req);

    req.body.items.map(function (item) {

        promises.push(
            new Promise(function(resolve, reject) {

                Model
                    .findOrCreate({id: item.id}, item)
                    .then(function (matchingRecord) {
                        return Model.update({id: matchingRecord.id}, item);
                    })
                    .then(function updated(records) {

                        // Because this should only update a single record and update
                        // returns an array, just use the first item.  If more than one
                        // record was returned, something is amiss.
                        if (!records || !records.length || records.length > 1) {
                            req._sails.log.warn(
                                util.format('Unexpected output from `%s.update`.', Model.globalId)
                            );
                        }

                        resolve(records);

                    })// </updated>
                    .catch(reject);
            })
        );

    }); // </found>

    Promise.all(promises)
        .then(function(a){
            return Model.find();
        })
        .then(function (data) {
            res.ok(data);
        })
        .catch(function(err){
            res.serverError(err);
        });

};