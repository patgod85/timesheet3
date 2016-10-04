let Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let router = require('basis.router');
let currentPage = Value.from(router.route(':page').param('page'));

export default new Node({
    template: resource('./template.tmpl'), // <div class="btn-group btn-group-lg"/>
    childClass: {
        template: resource('./item.tmpl'),
        disabled: currentPage.compute((node, page) => node.url == page),
        binding: {
            title: 'title'
        },
        action: {
            click() {
                router.navigate(this.url);
            }
        }
    },
    childNodes: [
        {title: 'О проекте', url: 'about'},
        {title: 'Отделы', url: 'teams'},
    ]
});
