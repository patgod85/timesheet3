/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true,
            maxLength: 30
        },
        surname: {
            type: 'string',
            required: true,
            maxLength: 30
        },
        work_start: {
            type: 'date',
            required: true
        },
        work_end: {
            type: 'date'
        },
        team: {
            model: 'team'
        },
        position: {
            type: 'string',
            required: true,
            maxLength: 30
        }

    }
};

