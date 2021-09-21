const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.BDD_CONN, {}, () => {
      console.log('Base de datos connectada');
    });
  } catch (error) {
    console.log('Error al conectar la base de datos');
  }
};
