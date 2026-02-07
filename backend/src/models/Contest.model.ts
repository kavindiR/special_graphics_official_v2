import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';

export interface ContestAttributes {
  id: number;
  title: string;
  description: string;
  category: string;
  prize: number;
  clientId: number;
  status: 'open' | 'qualifying' | 'final_round' | 'completed' | 'cancelled';
  deadline: Date;
  requirements: string;
  stylePreferences?: string[];
  colorPreferences?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContestCreationAttributes extends Optional<ContestAttributes, 'id' | 'status' | 'stylePreferences' | 'colorPreferences' | 'createdAt' | 'updatedAt'> {}

export class Contest extends Model<ContestAttributes, ContestCreationAttributes> implements ContestAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: string;
  public prize!: number;
  public clientId!: number;
  public status!: 'open' | 'qualifying' | 'final_round' | 'completed' | 'cancelled';
  public deadline!: Date;
  public requirements!: string;
  public stylePreferences?: string[];
  public colorPreferences?: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prize: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Prize must be positive'
        }
      }
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.ENUM('open', 'qualifying', 'final_round', 'completed', 'cancelled'),
      defaultValue: 'open',
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stylePreferences: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    colorPreferences: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    }
  },
  {
    sequelize,
    tableName: 'contests',
    timestamps: true,
    indexes: [
      {
        fields: ['clientId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['category']
      }
    ]
  }
);

// Define associations
Contest.belongsTo(User, {
  foreignKey: 'clientId',
  as: 'client'
});

User.hasMany(Contest, {
  foreignKey: 'clientId',
  as: 'contests'
});

// Note: ContestSubmission association is defined in ContestSubmission.model.ts
// This ensures proper circular dependency handling

export default Contest;

