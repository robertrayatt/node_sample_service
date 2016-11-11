"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", 
              {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                   },
                username: DataTypes.STRING,      
                firstName:{
                    type: DataTypes.STRING,
                    field: 'first_name',
                   },            
                lastName:{
                    type: DataTypes.STRING,
                    field: 'last_name',
                   }      
              }, 
              {
                tableName: 'user'
              });
       return User;
};
