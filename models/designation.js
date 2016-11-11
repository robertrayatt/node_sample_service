"use strict";

module.exports = function(sequelize, DataTypes) {
  var Designation = sequelize.define("Designation", 
              {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                   },
                designationName:{
                    type: DataTypes.STRING,
                    field: 'designation_name',
                   }      
              }, 
              {
                tableName: 'designation'
              });
       return Designation;
};
