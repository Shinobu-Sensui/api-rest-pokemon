const { allTypes } = require('../db/pokemons')
 
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom de ce pokémon existe déjà.'
            },
            validate : {
               notEmpty : { msg: 'Le nom du pokémon ne peut pas être vide.' }, 
               notNull: { msg: 'Le nom du pokémon est une propriété requise.'},
               len: { 
                 args:[3, 30],
                 msg: 'La taille du pokémon doit être comprise entre 3 et 30 caractères.'
               }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: 'Les points de vie sont une propriété requise.' },
                min: {
                    args: [1], 
                    msg: 'Les points de vie minimum d\'un pokémon est de 0'
                },
                max: {
                    args: [999], 
                    msg: 'Le maximum de points de vie d\'un pokémon est de 999.'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate : {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour la puissance de combat du Pokémon.' }, 
                notNull : { msg : 'La propriété puissance de combat du pokémon est une propriété requise. '},
                min: {
                    args: [1], 
                    msg: 'La puissance de combat minimale d\'un pokémon est de 1.'
                }, 
                max: {
                    args: [999], 
                    msg: 'La puissance maximale d\'un pokémon est de 999.'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'L\'url du pokémon doit être valide.'},
                notNull: { msg: 'L\'url du pokémon est une propriété requise.' }
            }  
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            }, 
            validate: {
                isTypesValid(value) {
                    if(!value) {
                        throw new Error('Un pokémon doit au moins avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
                    }
                    value.split(',')
                    .map(element => element.toLowerCase())
                    .forEach(type => {
                        if(!allTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${ allTypes.join(' ') }`)
                        }
                    })
                }
            }
        }    
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}

