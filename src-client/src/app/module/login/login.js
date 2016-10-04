
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;
let Node = require('basis.ui').Node;

import api from 'app.api';

let apiState = Value.state(api);

export default new Node({

    template: resource('./template.tmpl'),

    data: {
        email: '',
        password: ''
    },

    binding: {
        email: 'data:',
        password: 'data:',
        error: apiState.as(state => state == STATE.ERROR && state.data)
    },

    action: {
        login() {
            api.login(this.data);
        },

        input: function (event) {
            this.update({
                [event.sender.name]: event.sender.value
            });
        }

    }
});
