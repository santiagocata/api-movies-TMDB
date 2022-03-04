const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  hash = function (password, salt) {
    return bcrypt.hash(password, salt);
  };
  toggleFavorite = function (id) {
    this.favorites.includes(id)
      ? this.favorites.splice(this.favorites.indexOf(id), 1)
      : this.favorites.push(id);
    User.update({ favorites: this.favorites }, { where: { id: this.id } });
    return this;
  };
}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    favorites: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    },
  },
  { sequelize: db, modelName: "users" }
);

User.beforeCreate((user) => {
  console.log(user);
  return bcrypt
    .genSalt(1)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
