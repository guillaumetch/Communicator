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
                messages.insert( { object : "Besoin d'un cours de NodeJS", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "Javascript",intervenant: "Mr Priou"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "UX Design",intervenant: "Mr Bassoleil"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "UX Design",intervenant: "Mr Bassoleil"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "PHP",intervenant: "Mr Lescouarnec"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "Organisation de l'école",intervenant: "Mr Villa Monteiro"} );

                messages.insert( { object : "Besoin d'un cours de NodeJS", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "Javascript",intervenant: "Mr Priou"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "UX Design",intervenant: "Mr Bassoleil"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "UX Design",intervenant: "Mr Bassoleil"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "PHP",intervenant: "Mr Lescouarnec"} );

                messages.insert( { object : "Lorem ipsum dolor sit amet", libelle : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ", createAt: new Date(), matiere: "Organisation de l'école",intervenant: "Mr Villa Monteiro"} );
            }
            if( !intervenants.find().count())
            {
                intervenants.insert({nom: "Mr Priou"});
                intervenants.insert({nom: "Mr Bassoleil"});
                intervenants.insert({nom: "Mr Lescouarnec"});
                intervenants.insert({nom: "Mr Villa Monteiro"});
            }
            if( !matieres.find().count())
            {
                matieres.insert({libelle:"Javascript"});
                matieres.insert({libelle:"UX Design"});
                matieres.insert({libelle:"PHP"});
                matieres.insert({libelle:"Organisation de l'école"})
            }
        }
    );
}

