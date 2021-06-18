// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    userid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
    // createdat: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    // },
    // updatedat: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    // }
  }, {
    sequelize,
    tableName: 'users',
    schema: process.env.SCHEMA,
    timestamps: true,
    indexes: [
      {
        name: 'pk_users_userid',
        unique: true,
        fields: [
          { name: 'userid' }
        ]
      }
    ]
  })
}
