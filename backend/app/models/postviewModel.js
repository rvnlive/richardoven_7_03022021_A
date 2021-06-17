const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('postview', {
    postviewid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'postview',
    schema: 'ocproject7',
    timestamps: true,
    indexes: [
      {
        name: 'postview_pkey',
        unique: true,
        fields: [
          { name: 'postviewid' }
        ]
      }
    ]
  })
}
