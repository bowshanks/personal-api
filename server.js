var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware');
var mainCtrl = require('./controllers/mainCtrl');

var app = express();
app.use(bodyParser.json());
app.use(middleware.addHeaders);
app.get('/secrets/:username/:pin',middleware.verifyUser);

app.get('/name',mainCtrl.getName);
app.get('/location',mainCtrl.getLocation);
app.get('/occupations',mainCtrl.getOccupations);
app.get('/occupations/latest',mainCtrl.getOccupationsLatest);
app.get('/skills',mainCtrl.getSkills);
app.get('/secrets/:username/:pin', mainCtrl.getSecrets);
app.get('/hobbies/',mainCtrl.getHobbies);
app.get('/hobbies/:type',mainCtrl.getHobby);

app.put('/name',mainCtrl.updateName)
app.put('/location',mainCtrl.updateLocation);

app.post('/hobbies',mainCtrl.addHobby);
app.post('/occupations',mainCtrl.addOccupation);
app.post('/skills',mainCtrl.addSkills);


app.listen(8080, function(){
  console.log('listen 8080 running');
});
