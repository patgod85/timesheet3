let Dataset = require('basis.data').Dataset;
let wrap = require('basis.data').wrap;
let action = require('basis.net.action');

export default new Dataset({
    syncAction: action.create({
        url: '/api/teams',
        success(response) {
            this.set(wrap(response, true))
        }
    }),
    // создаем action для сохранения данных
    save: action.create({
        url: '/api/teams',
        method: 'post',
        contentType: 'application/json',
        encoding: 'utf8',
        // определяем данные, которые должны "уйти" на сервер
        body() {
            return {
        //         передаем на сервер содержимое элементов набора
        //         this указывает на набор данных, в контексте которого был вызван метод save
                items: this.getValues('data')
            };
        }
    }),


    handler: {
        itemsChanged(sender, delta){
            const self = this;
            if(0 && delta.deleted){
// console.log(delta.deleted);
                delta.deleted.map(d => {
                    if(d.data.hasOwnProperty('id')){
                        deleteItem(d.data.id);
                    }
                }).bind(self);

                function deleteItem(id){

                    const _action = action.create({
                        url: '/api/teams/' + id,
                        method: 'delete'
                    });

                    _action();
                }

            }
        }
    }

});
