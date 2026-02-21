import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';

export interface PortfolioAttributes {
  id: number;
  designerId: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  views: number;
  likes: number;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PortfolioCreationAttributes extends Optional<PortfolioAttributes, 'id' | 'views' | 'likes' | 'isFeatured' | 'tags' | 'createdAt' | 'updatedAt'> {}

export class Portfolio extends Model<PortfolioAttributes, PortfolioCreationAttributes> implements PortfolioAttributes {
  public id!: number;
  public designerId!: number;
  public title!: string;
  public description!: string;
  public imageUrl!: string;
  public category!: string;
  public tags?: string[];
  public views!: number;
  public likes!: number;
  public isFeatured!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Portfolio.init(
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
      allowNull: false
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
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'portfolios',
    timestamps: true,
    indexes: [
      {
        fields: ['designerId']
      },
      {
        fields: ['category']
      },
      {
        using: 'GIN',
        fields: ['tags']
      }
    ]
  }
);

// Define associations
Portfolio.belongsTo(User, {
  foreignKey: 'designerId',
  as: 'designer'
});

User.hasMany(Portfolio, {
  foreignKey: 'designerId',
  as: 'portfolio'
});

export default Portfolio;








