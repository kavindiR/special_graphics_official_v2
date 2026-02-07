import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Contest from './Contest.model';
import User from './User.model';

export interface ContestSubmissionAttributes {
  id: number;
  contestId: number;
  designerId: number;
  imageUrl: string;
  description?: string;
  isWinner: boolean;
  isFinalist: boolean;
  rating?: number;
  feedback?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContestSubmissionCreationAttributes extends Optional<ContestSubmissionAttributes, 'id' | 'isWinner' | 'isFinalist' | 'rating' | 'feedback' | 'description' | 'createdAt' | 'updatedAt'> {}

export class ContestSubmission extends Model<ContestSubmissionAttributes, ContestSubmissionCreationAttributes> implements ContestSubmissionAttributes {
  public id!: number;
  public contestId!: number;
  public designerId!: number;
  public imageUrl!: string;
  public description?: string;
  public isWinner!: boolean;
  public isFinalist!: boolean;
  public rating?: number;
  public feedback?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ContestSubmission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Contest,
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isWinner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isFinalist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'contest_submissions',
    timestamps: true,
    indexes: [
      {
        fields: ['contestId']
      },
      {
        fields: ['designerId']
      },
      {
        unique: true,
        fields: ['contestId', 'designerId']
      }
    ]
  }
);

// Define associations
ContestSubmission.belongsTo(Contest, {
  foreignKey: 'contestId',
  as: 'contest'
});

ContestSubmission.belongsTo(User, {
  foreignKey: 'designerId',
  as: 'designer'
});

Contest.hasMany(ContestSubmission, {
  foreignKey: 'contestId',
  as: 'submissions'
});

User.hasMany(ContestSubmission, {
  foreignKey: 'designerId',
  as: 'submissions'
});

export default ContestSubmission;

