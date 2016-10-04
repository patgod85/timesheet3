
let ajax = require('basis.net.ajax');
let AbstractData = require('basis.data').AbstractData;
let STATE = require('basis.data').STATE;

module.exports = new AbstractData({
    init() {
        AbstractData.prototype.init.call(this);
    },

    isLoggedIn() {
        return new Promise((resolve, reject) => {
            ajax.request({
                url: '/api/auth/whoami',
                method: 'GET',
                contentType: "application/json",
                handler: {
                    success: function(transport, req, res){
                        res.success ? resolve(res) : reject();
                    },
                    failure: reject
                }
            });
        });
    },
    login(data) {
        let self = this;
        this.setState(STATE.PROCESSING);
        this.isLoggedIn().then(
            () => this.setState(STATE.READY),
            () => {

                ajax.request({
                    url: '/api/auth/login',
                    method: 'POST',
                    contentType: "application/json",
                    body: JSON.stringify(data),
                    handler: {
                        success: function(transport, req, res){
                            self.setState(res.hasOwnProperty('auth') ? STATE.READY : STATE.UNDEFINED, res.auth);
                        },
                        failure: function(transport, req, res){
                            self.setState(STATE.ERROR, JSON.parse(res.msg).error);
                        }
                    }
                });
            });
    },
    logout() {
        ajax.request({
            url: '/api/auth/logout',
            method: 'GET',
            contentType: "application/json"
        });

        this.setState(STATE.UNDEFINED);
    },
    callApi(method, params = {}) {
        return this.isLoggedIn()
            .catch(e => Promise.reject(new Error('Ошибка авторизации!')))
            .then(
                ()=> {
                    return new Promise((resolve, reject) => {
                        // basis.object.complete(params, {v: 'remove'});

                        ajax.request({
                            url: '/api/' + method,
                            method: 'GET',
                            contentType: "application/json",
                            params,
                            handler: {
                                success: (transport, req, res) => {
                                    if (res.error) {
                                        reject(new Error(res.error.error_msg));
                                    } else {
                                        resolve(res);
                                    }
                                }
                            }
                        });
                    });
                },
                e => {
                    this.setState(STATE.ERROR, e.message);
                    throw e;
                })
    },

    whoami() {
        this.setState(STATE.PROCESSING);
        this.isLoggedIn().then(
            (user) => this.setState(STATE.READY, user),
            () => this.setState(STATE.UNDEFINED)
        );
    },
    teams() {
        return this.callApi('team');
    }
});