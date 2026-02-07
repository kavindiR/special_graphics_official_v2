import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';
import Contest from './Contest.model';

export interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  category: string;
  clientId: number;
  designerId?: number;
  budget: number;
  status: 'open' | 'invited' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  deadline?: Date;
  requirements: string;
  deliverables?: string[];
  stylePreferences?: string[];
  colorPreferences?: string[];
  relatedContestId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'designerId' | 'status' | 'deadline' | 'deliverables' | 'stylePreferences' | 'colorPreferences' | 'relatedContestId' | 'createdAt' | 'updatedAt'> {}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: string;
  public clientId!: number;
  public designerId?: number;
  public budget!: number;
  public status!: 'open' | 'invited' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  public deadline?: Date;
  public requirements!: string;
  public deliverables?: string[];
  public stylePreferences?: string[];
  public colorPreferences?: string[];
  public relatedContestId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    designerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Budget must be positive'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('open', 'invited', 'in_progress', 'review', 'completed', 'cancelled'),
      defaultValue: 'open',
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Requirements are required'
        }
      }
    },
    deliverables: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
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
    },
    relatedContestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Contest,
        key: 'id'
      },
      onDelete: 'SET NULL'
    }
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true,
    indexes: [
      {
        fields: ['clientId']
      },
      {
        fields: ['designerId']
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
Project.belongsTo(User, {
  foreignKey: 'clientId',
  as: 'client'
});

Project.belongsTo(User, {
  foreignKey: 'designerId',
  as: 'designer'
});

Project.belongsTo(Contest, {
  foreignKey: 'relatedContestId',
  as: 'relatedContest'
});

User.hasMany(Project, {
  foreignKey: 'clientId',
  as: 'clientProjects'
});

User.hasMany(Project, {
  foreignKey: 'designerId',
  as: 'designerProjects'
});

export default Project;

