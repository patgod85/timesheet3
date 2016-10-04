/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').waterlocked({
    whoami: function (req, res) {

        if(req.session.user && req.session.user.hasOwnProperty('auth')){
            return res.send({success: true, id: req.session.user.auth.id, email: req.session.user.auth.email});
        }else{
            return res.send({ success: false });
        }
    }

});