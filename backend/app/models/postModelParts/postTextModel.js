const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('texts', {
    textid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    textcontent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'texts',
    schema: 'ocproject7',
    timestamps: true,
    indexes: [
      {
        name: 'pk_texts_textid',
        unique: true,
        fields: [
          { name: 'textid' }
        ]
      }
    ]
  })
}
