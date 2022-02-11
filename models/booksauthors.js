'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BooksAuthors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BooksAuthors.init({
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'BooksAuthors',
    tableName: 'booksAuthors',
    timestamps: false
  });
  return BooksAuthors;
};