const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('uploads', {
    uploadid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    imagesrc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagealt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'postid'
      }
    }
  }, {
    sequelize,
    tableName: 'uploads',
    schema: 'ocproject7',
    timestamps: true,
    indexes: [
      {
        name: 'pk_uploads_uploadid',
        unique: true,
        fields: [
          { name: 'uploadid' }
        ]
      }
    ]
  })
}
