import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

messages = new Mongo.Collection('messages');
intervenants = new Mongo.Collection('intervenants');
matieres = new Mongo.Collection('matieres');

if ( Meteor.isServer )
{
    Meteor.startup
    (
        function ()
        {
            // Populate once
            if ( !messages.find().count() )
            {
                messages.insert( { object : "Variable", libelle : "Comment définir une variable ?",matiere: "Javascript",intervenant: "Mr Priou"} );
            }
            if( !intervenants.find().count())
            {
                intervenants.insert({nom: "Mr Priou"})
            }
            if( !matieres.find().count())
            {
                matieres.insert({libelle:"Javascript"})
            }
        }
    );
}

