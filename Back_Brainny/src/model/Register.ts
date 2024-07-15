import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

// Interface para atributos obrigatórios
interface RegisterAttributes {
    id: number;
    user_id: number;
    registered_time: Date;
}

// Interface para atributos opcionais
interface RegisterCreationAttributes extends Optional<RegisterAttributes, 'id'> {}

class Register extends Model<RegisterAttributes, RegisterCreationAttributes> implements RegisterAttributes {
  public id!: number;
  public user_id!: number;
  public registered_time!: Date;

  // Defina a relação de chave estrangeira
  static associate(models: any) {
    Register.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

Register.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    }
  },
  registered_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Register',
  tableName: 'registered_time',
  timestamps: false,
});

export default Register;