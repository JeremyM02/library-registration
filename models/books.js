'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.belongsToMany(models.Author, {
        through: 'books_authors',
        as: 'books',
        foreignKey: 'book_id',
        otherKey: 'author_id',
        timestamps: false
      })
    }
  }
  Books.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    publisher: DataTypes.STRING,
    genre: DataTypes.STRING,
    page_amount: DataTypes.INTEGER,
    cover_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
    timestamps:false,
    tableName: 'books'
  });
  return Books;
};