const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    }, 
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true 
    }, 
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be at least 4 characters long.']
    }, 
    saltSecret: String,
    role: String
}); 

userSchema.path('email').validate((val) => { 
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val); 
}, 'Invalid e-mail.');

userSchema.statics.EncryptPassword = async function(password) {  const hash = await bcrypt.hash(password, 12);  return hash;};

userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err,salt) => { 
        bcrypt.hash(this.password, salt, (err, hash) => { 
            this.password = hash; 
            this.saltSecret = salt;
            next();
        });});});

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}; 

userSchema.methods.generateJwt = function(){ 
    return jwt.sign({_id:this._id, rol: this.role /*,tst: "tst"*/ },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        }); 
}

module.exports = mongoose.model('User',userSchema, 'users');