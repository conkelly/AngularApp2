const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var employeeController = require('./controllers/employeeController.js');
var userController = require('./controllers/user.controller.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');
const oauth2orize = require('oauth2orize');

require('./config/config');
require('./models/db');
require('./config/passportConfig');

var serve = oauth2orize.createServer();
var app = express();

serve.grant(oauth2orize.grant.code(function(client,redirectURI,user,ares,done){ 
    var code = utils.uid(16);

    var ac = new AuthorizationCode(code, client.id, redirectURI, user.id, ares.scope);
    ac.save(function(err){ 
        if (err){return done(err);}
        return done(null,code);
    });
}));

server.exchange(oauth)

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/index.router', passport.authenticate('jwt', {session: false}), rtsIndex);
app.use('/api',rtsIndex);
app.use('/employees', employeeController);
app.use('/register', rtsIndex);
app.use('/authenticate', rtsIndex);
app.use('/req-reset-password',rtsIndex); 
app.use('/new-password',rtsIndex);
app.use('/valid-password-token',rtsIndex);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

const server = require('http').createServer(app);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);}});

mongoose.Promise = global.Promise;
app.listen(process.env.PORT,() => console.log(`Server started at port : ${process.env.PORT} `));