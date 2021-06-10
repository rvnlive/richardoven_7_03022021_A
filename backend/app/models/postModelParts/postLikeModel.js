const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('postlikes', {
    postlikeid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'postlikes',
    schema: 'ocproject7',
    timestamps: true,
    indexes: [
      {
        name: 'postlikes_pkey',
        unique: true,
        fields: [
          { name: 'postlikeid' }
        ]
      }
    ]
  })
}
