const express = require('express'); 
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.post('/req-reset-password', ctrlUser.ResetPassword);
router.post('/new-password', ctrlUser.NewPassword);
router.post('/valid-password-token', ctrlUser.ValidPasswordToken);
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  
  /* GET user profile. */
  router.get('/authenticate', function(req, res, next) {
      res.send(req.user);
  });

module.exports = router;