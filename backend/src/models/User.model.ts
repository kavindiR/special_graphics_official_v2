import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'designer' | 'admin';
  avatar?: string;
  bio?: string;
  isVerified: boolean;
  // Designer-specific fields
  designerLevel?: 'entry' | 'mid' | 'top';
  rating?: number;
  totalEarnings?: number;
  contestsWon?: number;
  totalSubmissions?: number;
  portfolioViews?: number;
  skills?: string[];
  location?: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'avatar' | 'bio' | 'isVerified' | 'designerLevel' | 'rating' | 'totalEarnings' | 'contestsWon' | 'totalSubmissions' | 'portfolioViews' | 'skills' | 'location' | 'website' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'designer' | 'admin';
  public avatar?: string;
  public bio?: string;
  public isVerified!: boolean;
  public designerLevel?: 'entry' | 'mid' | 'top';
  public rating?: number;
  public totalEarnings?: number;
  public contestsWon?: number;
  public totalSubmissions?: number;
  public portfolioViews?: number;
  public skills?: string[];
  public location?: string;
  public website?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance method to exclude password from JSON
  public toJSON(): Omit<UserAttributes, 'password'> {
    const values = { ...this.get() };
    delete (values as any).password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, Infinity],
          msg: 'Password must be at least 6 characters'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('user', 'designer', 'admin'),
      defaultValue: 'user',
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: 'Bio cannot exceed 500 characters'
        }
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    designerLevel: {
      type: DataTypes.ENUM('entry', 'mid', 'top'),
      allowNull: true,
      defaultValue: 'entry'
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    contestsWon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    totalSubmissions: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    portfolioViews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidUrl(value: string | null | undefined) {
          if (value && value.trim() !== '') {
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (!urlPattern.test(value)) {
              throw new Error('Please provide a valid website URL');
            }
          }
        }
      }
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
    hooks: {
      beforeCreate: (user: User) => {
        // Convert email to lowercase
        if (user.email) {
          user.email = user.email.toLowerCase().trim();
        }
      },
      beforeUpdate: (user: User) => {
        // Convert email to lowercase
        if (user.email) {
          user.email = user.email.toLowerCase().trim();
        }
      }
    }
  }
);

export default User;
