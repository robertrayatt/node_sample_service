"use strict";

module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", 
              {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                   },
                companyName:{
                    type: DataTypes.STRING,
                    field: 'company_name',
                   }      
              }, 
              {
                tableName: 'company'
              });
       return Company;
};
