var Node = require('basis.ui').Node;
import Teams from './app/module/teams/index.js';

module.exports = require('basis.app').create({
    title: 'My app',

    element: new Node({
        container: document.body,
        template: resource('./app/template/layout.tmpl'),
        binding: {
            moduleName: Teams
        }
    })
});
