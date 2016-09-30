let Value = require('basis.data').Value;
let Expression = require('basis.data.value').Expression;
let DataObject = require('basis.data').Object;
let STATE = require('basis.data').STATE;
let Node = require('basis.ui').Node;

let action = require('basis.net.action');

import dataSet from './dataset';

export default new Node({
    // container: document.querySelector('.container'),
    container: document.body,

    active: true,
    dataSource: dataSet,
    // Node#disabled - одно из особых свойств, значение которого автоматически пробрасывается в binding не только текущего компонента, но дочерних
    disabled: Value.query('childNodesState').as(state => state != STATE.READY),

    template: resource('./template/list.tmpl'),
    binding: {
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        empty: node => new Expression(
            Value.query(node, 'childNodesState'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount && (state == STATE.READY || state == STATE.ERROR)
        )
    },
    action: {
        // добавить новый объект в набор
        add() {
            dataSet.add(new DataObject({data: {code: 'new'}}))
        },
        save() {
            dataSet.save()
        }
    },


    childClass: {
        template: resource('./template/item.tmpl'),
        binding: {
            name: 'data:'
        },
        action: {
            input(e) {
                this.update({name: e.sender.value})
            },
            onDelete() {
                // this.parentNode.dataSource.remove(this.delegate);
                this.remove();
            }
        },

        remove: action.create({
            request(){
                return {
                    url: '/api/teams/' + this.data.id,
                    method: 'delete'
                };
            },
            success(){
                this.delegate.destroy();
            }
        })
    }
});
