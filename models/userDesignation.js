"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserDesignation = sequelize.define("UserDesignation", 
              {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                   },
                userId:{
                    type: DataTypes.INTEGER,
                    field: 'user_id'
                   },
                companyId:{
                    type: DataTypes.INTEGER,
                    field: 'company_id'
                   },
                designationId:{
                    type: DataTypes.INTEGER,
                    field: 'designation_id'
                   }      
              }, 
              {
               tableName: 'user_designation'
              });
   return UserDesignation;
};