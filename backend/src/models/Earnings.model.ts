import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';
import Contest from './Contest.model';

export interface EarningsAttributes {
  id: number;
  designerId: number;
  contestId?: number;
  amount: number;
  type: 'contest_win' | 'project_payment' | 'bonus' | 'refund';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  description?: string;
  transactionId?: string;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EarningsCreationAttributes extends Optional<EarningsAttributes, 'id' | 'contestId' | 'status' | 'description' | 'transactionId' | 'paidAt' | 'createdAt' | 'updatedAt'> {}

export class Earnings extends Model<EarningsAttributes, EarningsCreationAttributes> implements EarningsAttributes {
  public id!: number;
  public designerId!: number;
  public contestId?: number;
  public amount!: number;
  public type!: 'contest_win' | 'project_payment' | 'bonus' | 'refund';
  public status!: 'pending' | 'processing' | 'completed' | 'failed';
  public description?: string;
  public transactionId?: string;
  public paidAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Earnings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    designerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Contest,
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Amount must be positive'
        }
      }
    },
    type: {
      type: DataTypes.ENUM('contest_win', 'project_payment', 'bonus', 'refund'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
      defaultValue: 'pending',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'earnings',
    timestamps: true,
    indexes: [
      {
        fields: ['designerId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['type']
      }
    ]
  }
);

// Define associations
Earnings.belongsTo(User, {
  foreignKey: 'designerId',
  as: 'designer'
});

Earnings.belongsTo(Contest, {
  foreignKey: 'contestId',
  as: 'contest'
});

User.hasMany(Earnings, {
  foreignKey: 'designerId',
  as: 'earnings'
});

export default Earnings;








