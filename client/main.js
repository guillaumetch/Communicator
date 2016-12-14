import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../imports/ui/body.html';

messages = new Mongo.Collection('messages');
intervenants = new Mongo.Collection('intervenants');
matieres = new Mongo.Collection('matieres');

// Helpers
Template.message.helpers
(
    {
        all_messages: function ()
        {
            console.log(Session.get('filtre'))
            if(Session.get("messages"))
            {
                var messages_find = Session.get('messages');
                for(var i=0;i<messages_find.length;i++)
                {
                    messages_find[i].createAt = moment(messages_find[i].createAt).format('D/MM/Y');
                }
                delete Session.keys["messages"];
                return messages_find;
            }
            else if(Session.get("filtre") == 'populaire')
            {
             var messages_pop = messages.find({},{sort:{like:-1}});
             return messages_pop;
            }
            else{
                return messages.find().map
                (
                    function (message, index, cursor) {
                        return {object: message.object, libelle: message.libelle, matiere: message.matiere, intervenant: message.intervenant,createAt: moment(message.createAt).format('D/MM/Y'),like: message.like};
                    }
                );
            }
        }
    }
);

Template.filtre.helpers
({
    filtre:function(){
        if(Session.get('filtre') == 'intervenants')
        {
            Session.set('filtre','intervenants');
            return "Intervenants";
        }
        else if(Session.get('filtre') == 'matieres')
        {
            return "Matières";
        }
    }
});

Template.select_filtre.helpers({

    all_filtres: function()
    {
        if(Session.get('filtre') == 'intervenants')
        {
            return intervenants.find().map
            (
                function (intervenant,index,cursor)
                {
                    return {filtre: intervenant.nom}
                }
            )
        }
        else if(Session.get('filtre') == "matieres")
        {
            return matieres.find().map
            (
                function (matiere,index,cursor)
                {
                    return {filtre: matiere.libelle}
                }
            )
        }
    }

});

//Events
Template.select_filtre.events(
    {
        'change':function(event, template)
        {
            var val = template.find('#select_intervenants');
            var messages_find = null;
            if( val.value === 'Toutes')
            {
                messages_find = messages.find().fetch();
            }
            else{
                if(Session.get('filtre')=='intervenants')
                {
                    messages_find = messages.find({intervenant:val.value}).fetch();
                }
                else if(Session.get('filtre')=='matieres'){
                    messages_find = messages.find({matiere:val.value}).fetch();
                }
            }
            Session.set("messages",messages_find);
        }
    }
);

Template.body.events({
    'click .icon-matiere':function(event,template){
        Session.set('filtre','matieres');
    },
    'click .icon-intervenants':function(event,template){
        Session.set('filtre','intervenants');
    },
    'click .icon-populaire':function(event,template){
        Session.set('filtre','populaire');
    },
    'click .icon-coeur':function(event,template){
        Session.set('filtre','coeur');
    }
});
