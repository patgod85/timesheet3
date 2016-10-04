let Value = require('basis.data').Value;
let Expression = require('basis.data.value').Expression;
let MasterPage = require('../MasterPage');
import Team from '../../../type/team';
let dataSource = Team.all;
let STATE = require('basis.data').STATE;


export default new MasterPage({
    name: "TeamsPage",

    template: resource('./list.tmpl'),
    dataSource: dataSource,

    // Node#disabled - одно из особых свойств, значение которого автоматически пробрасывается в binding не только текущего компонента, но дочерних
    disabled: Value.query('childNodesState').as(state => state != STATE.READY),

    binding: {
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        empty: node => new Expression(
            Value.query(node, 'childNodesState'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount && (state == STATE.READY || state == STATE.ERROR)
        )
    },

    action:{

        add() {
            Team({code: 'new', id: undefined})
        },
        save() {
            Team.all.save()
        }
    },


    childClass: {
        template: resource('./item.tmpl'),
        binding: {
            name: 'data:',
            code: 'data:'
        },

        action: {
            input(e) {
                this.update({[e.sender.name]: e.sender.value})
            },
            onDelete() {
                this.delegate.destroy();
            }
        },
    }
});