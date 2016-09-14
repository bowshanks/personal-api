var users = require('../models/users');

module.exports = {
  getName: function(req, res, next){
    res.status(200).json({name: users.name});
  },
  getLocation: function(req, res, next){
    res.status(200).json({location: users.location});
  },
  getOccupations: function(req, res, next){
    res.status(200).json({occupations: users.occupations});
  },
  getOccupationsLatest: function(req, res, next){
    res.status(200).json({lastestOccupation: users.occupations[users.occupations.length - 1]});
  },
  getHobbies:function(req, res, next){
    res.status(200).json({hobbies: users.hobbies});
  },
  getHobby: function(req, res, next){
    if (req.params.type !== null){
      var hobbyType = req.params.type
      var currentHobbies = [];
      users.hobbies.map(function(hobby){
        if (hobby.type === hobbyType){
          currentHobbies.push(hobby);
        }
      })
      if (currentHobbies[0] == null){
        res.sendStatus(400);
      }
      else {
        res.status(200).json({hobbies: currentHobbies});
      }
    }
  },
  getSkills: function(req, res, next){
    var skills = users.skills;
    var resSkills = [];
    // this is all so the id doesn't display
    for (var i = 0; i < skills.length; i++){
      if (req.query.experience == null){
        resSkills.push(
          {
            name: skills[i]["name"],
            experience: skills[i]["experience"]
          }
        )
      }
      else {
        if (req.query.experience === skills[i]["experience"]){
          resSkills.push(
            {
              name: skills[i]["name"],
              experience: skills[i]["experience"]
            }
          )
        }
      }
    }
    res.status(200).json({skills: resSkills});
  },
  getSecrets: function(req, res, next){
    res.status(200).json({secrets: users.secrets});
  },
  updateName: function(req, res, next){
    users.name = req.body.name;
    res.status(200).json({name: users.name});
  },
  updateLocation: function(req, res, next){
    users.location = req.body.location;
    res.status(200).json({location: users.location});
  },
  addHobby: function(req, res, next){
    if (users.hobbies == null){
      users.hobbies = [req.body];
    }
    else {
      users.hobbies.push(req.body);
    }
    res.status(200).json({hobbies: users.hobbies});
  },
  addOccupation: function(req, res, next){
    if (users.occupations == null){
      users.occupations = [req.body.occupation];
    }
    else {
      users.occupations.push(req.body.occupation);
    }
    res.status(200).json({occupations: users.occupations});
  },
  addSkills: function(req, res, next){
    var maxId = 0;
    for (var i = 0; i < users.skills.length; i++){
      if (parseInt(users.skills[i].id) >= maxId){
        maxId = parseInt(users.skills[i].id) + 1
      }
    };
    var skill = req.body;
    skill.id = maxId;
    if (users.skills == null){
      users.skills = [skill];
    }
    else {
      users.skills.push(skill);
    }
    res.status(200).json({skills: users.skills});
  }
}
