import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';

export interface DesignAttributes {
  id: number;
  title: string;
  designerId: number;
  designerName: string;
  description: string;
  image: string;
  tags: string[];
  tools: string;
  likes: number;
  likedBy: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DesignCreationAttributes extends Optional<DesignAttributes, 'id' | 'likes' | 'likedBy' | 'createdAt' | 'updatedAt'> {}

export class Design extends Model<DesignAttributes, DesignCreationAttributes> implements DesignAttributes {
  public id!: number;
  public title!: string;
  public designerId!: number;
  public designerName!: string;
  public description!: string;
  public image!: string;
  public tags!: string[];
  public tools!: string;
  public likes!: number;
  public likedBy!: number[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Design.init(
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
        },
        len: {
          args: [1, 200],
          msg: 'Title cannot exceed 200 characters'
        }
      }
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
    designerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Designer name is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        len: {
          args: [1, 1000],
          msg: 'Description cannot exceed 1000 characters'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL is required'
        },
        isUrl: {
          msg: 'Please provide a valid image URL'
        }
      }
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    tools: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Tools is required'
        }
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    likedBy: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: []
    }
  },
  {
    sequelize,
    tableName: 'designs',
    timestamps: true,
    indexes: [
      {
        fields: ['designerId']
      },
      {
        using: 'GIN',
        fields: ['tags']
      }
    ]
  }
);

// Define associations
Design.belongsTo(User, {
  foreignKey: 'designerId',
  as: 'designer'
});

User.hasMany(Design, {
  foreignKey: 'designerId',
  as: 'designs'
});

export default Design;
