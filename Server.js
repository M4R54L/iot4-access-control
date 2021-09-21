const express = require('express');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');

const { connect } = require('./database/config');

class Server {
  constructor() {
    this.app = express();
    this.host = process.env.HOST;
    this.port = process.env.PORT;
    this.corsOptions = {};

    this.router = {
      User: {
        path: '/api/user',
        route: require('./routes/user.route'),
      },
      Rol: {
        path: '/api/rol',
        route: require('./routes/rol.route'),
      },
    };

    this.database();
    this.middlewares();
    this.routes();
  }
  async database() {
    await connect();
  }

  middlewares() {
    // this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('./client/build'));
    // this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.router.User.path, this.router.User.route);
    this.app.use(this.router.Rol.path, this.router.Rol.route);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running at ${this.port}`);
    });
  }
}

module.exports = Server;
