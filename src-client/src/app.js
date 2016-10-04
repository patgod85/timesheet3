let STATE = require('basis.data').STATE;
let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;

import Login from './app/module/login/login';
import Menu from './app/module/menu/menu';

import api from 'app.api';
let apiState = Value.state(api);

let router = require('basis.router');

let defaultRoute = 'about';

import About from './app/module/pages/About/about.js';
import Teams from './app/module/pages/Teams/teams.js';
import NotFound from './app/module/pages/404/404.js';

let pageByName = {
    about: About,
    teams: Teams,
    notFound: NotFound
};

module.exports = require('basis.app').create({
    title: 'My app',

    element: new Node({
        container: document.body,
        template: resource('./app/template/layout.tmpl'),

        active: apiState.as(state => {
            return state == STATE.READY
        }),
        disabled: apiState.as(state => state == STATE.PROCESSING),

        binding: {
            login: Login,
            user: apiState.as(state => state == STATE.READY && state.data && state.data.hasOwnProperty('email') && state.data.email ),
            // page: Teams,
            menu: Menu,
            page: 'satellite:'
        },
        satellite:{
            page: router.route(':page').param('page').as(page => pageByName[page] || pageByName.notFound )

        },
        action: {
            // обработка кнопки "авторизоваться"
            logout() {
                api.logout();
            }
        }
    })
}).ready(() => {
    router.route('*page').param('page').as(page => page || router.navigate(defaultRoute, true) );
    api.whoami();
});
