let entity = require('basis.entity');
let api = require('app.api');
let action = require('basis.net.action');
let ajax = require('basis.net.ajax');

let Team = entity.createType({
    name: 'Team',
    fields: {
        id: entity.IntId,
        name: String,
        code: String
    },
    all: {
        syncAction() {
            return api.teams().then(Team.all.set)
        },

        save: action.create({
            url: '/api/team',
            method: 'post',
            contentType: 'application/json',
            encoding: 'utf8',
            // определяем данные, которые должны "уйти" на сервер
            body() {
                return {
                    items: Team.all.getValues('data')
                };
            }
        }),


        handler: {
            itemsChanged(sender, delta){

                if(delta.deleted){

                    delta.deleted.map(d => {
                        if(d.data.hasOwnProperty('id')){
                            deleteItem(d.data.id);
                        }
                    });

                    function deleteItem(id){

                        ajax.request({
                            url: '/api/team/' + id,
                            method: 'DELETE',
                            contentType: "application/json",
                            handler: {
                                success: function(transport, req, res){
                                    alert('Removed');
                                },
                                failure(error){
                                    alert(error);
                                }
                            }
                        });
                    }

                }
            }
        }
    },


});


export default Team;