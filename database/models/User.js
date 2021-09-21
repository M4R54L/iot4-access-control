const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    code: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rol: {
      type: Schema.Types.ObjectId,
      ref: 'Rol',
      required: true,
    },
    firstLogin: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
