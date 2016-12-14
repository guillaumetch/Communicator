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
            return messages.find().map
            (
                function (message, index, cursor) {

                    if(Session.get("intervenant"))
                    {
                        console.log('session');
                    }
                    else{
                        return {object: message.object, libelle: message.libelle, matiere: message.matiere, createAt: message.createAt, intervenant: message.intervenant};
                    }

                }
            );
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
            console.log(val.value)
            console.log(intervenants.findOne({intervenant:val.value}));
            Session.set("intervenant",val.value);


        }
    }
)
