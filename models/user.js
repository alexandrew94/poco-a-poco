const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.virtual('pieces', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Piece'
});

userSchema.plugin(require('mongoose-unique-validator'));

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema
  .virtual('totalPracticed')
  .get(function () {
    if (this.pieces) {
      const totalPracticedArray = this.pieces.map(entry => {
        return entry.totalPracticed;
      });
      return totalPracticedArray.reduce((a, i) => a + i, 0);
    }
  });

userSchema
  .pre('validate', function checkPassword(next){
    if(this.isModified('password') && this._passwordConfirmation !== this.password){
      this.invalidate('passwordConfirmation', 'does not match');
    }
    if(!this.email.match(/@/)) {
      this.invalidate('email', 'Must be a valid email address');
    }
    next();
  });

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
