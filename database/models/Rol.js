const { Schema, model } = require('mongoose');

const rolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    claims: [
      {
        section: String,
        create: { type: Boolean, default: false },
        read: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
    ],
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// rolSchema.pre('init', function (next) {
//   console.log('Find middleware');
// });

module.exports = model('Rol', rolSchema);
