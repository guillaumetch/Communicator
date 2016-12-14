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
            if(Session.get("messages"))
            {
                var messages_find = Session.get('messages');
                for(var i=0;i<messages_find.length;i++)
                {
                    messages_find[i].createAt = moment(messages_find[i].createAt).format('D/MM/Y');
                }
                delete Session.keys['messages'];
                return messages_find;
            }
            else{
                return messages.find().map
                (
                    function (message, index, cursor) {
                        return {object: message.object, libelle: message.libelle, matiere: message.matiere, intervenant: message.intervenant,createAt: moment(message.createAt).format('D/MM/Y')};
                    }
                );
            }
        }
    }
);

Template.intervenant.helpers
(
    {
        all_intervenants: function()
        {
            return intervenants.find().map
            (
                function (intervenant,index,cursor)
                {
                    return {intervenant: intervenant.nom}
                }
            )
        }
    }
)

//Events
Template.intervenant.events(
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
                messages_find = messages.find({intervenant:val.value}).fetch();
            }

            Session.set("messages",messages_find);
        }
    }
)
