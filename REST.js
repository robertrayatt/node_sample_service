var models  = require('./models');
var path   = require("path");
var random = require("random-js")();
var config  = require(path.join(__dirname, '', 'config', 'config.json'));

function REST_ROUTER(router) {
    var self = this;
    
    //Setting up the entities relations
    models.UserDesignation.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
    models.User.hasMany(models.UserDesignation);
    
    models.UserDesignation.belongsTo(models.Company, {foreignKey: 'companyId', targetKey: 'id'});
    
    models.UserDesignation.belongsTo(models.Designation, {foreignKey: 'designationId', targetKey: 'id'});    
    
    self.handleRoutes(router);
}

REST_ROUTER.prototype.handleRoutes = function(router) {
    var self = this;    

    router.get("/",function(req,res){
       res.json({"Message" : "REST Server is running !"});
    });
    
      
    router.post("/addUser",function(req,res){
        var username=req.body.username;
        var firstName=req.body.firstname;
        var lastName=req.body.lastname;
        
        var numOfDesignations=random.integer(1, 6);        
        
        models.User.findOne({where:{username: username}}).then(function(user) {
             if(user!=null)
             {    
                 user.updateAttributes({
                        firstName: firstName,
                        lastName: lastName
                 }).then(function (userData){
                      res.json({success: true, user: userData});    
                 });                                
             }
             else
             {
                models.User.create({
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        }).then(function(userData){

                        for(var i=0;i<numOfDesignations;i++)
                        {   
                            models.UserDesignation.create({
                                    userId: userData.id,
                                    companyId: random.integer(1, 12),
                                    designationId: random.integer(1, 12)
                                    }).then(function(userDesignation){
                                         console.log(JSON.stringify(userDesignation));
                                    });
                        }
                    
                        res.json({success: true, user: userData});                                                                     
                    });  
             }
        });
    });
    
    
    router.get("/getUsers",function(req,res){
        models.User.findAll({where:{}, include: [{model: models.UserDesignation, include: [models.Designation,models.Company]}] }).then(function(users) {
              res.json(users);
        });
    });
    

    router.get("/getUserById",function(req,res){
        models.User.find({where:{id: req.query.userid}, include: [{model: models.UserDesignation, include: [models.Designation,models.Company]}] }).then(function(user){
              res.json(user);
        });
    });    
    
    
    router.get("/getCompanies",function(req,res){
        models.Company.findAll().then(function(companies){
              res.json(companies);
        });
    });    
    
    
    router.get("/getDesignations",function(req,res){
        models.Designation.findAll().then(function(designations){
              res.json(designations);
        });
    });        
    
    
    router.get("/getDesignationsByUserId",function(req,res){
        models.UserDesignation.findAll({where:{userId: req.query.userid}, include: [{model: models.Designation},{model: models.Company}] }).then(function(userDesignations) {
              res.json(userDesignations);
        });
    });        
    
            
}

module.exports = REST_ROUTER;