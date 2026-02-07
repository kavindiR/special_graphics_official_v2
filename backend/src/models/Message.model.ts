import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User.model';
import Contest from './Contest.model';

export interface MessageAttributes {
  id: number;
  senderId: number;
  receiverId: number;
  contestId?: number;
  subject?: string;
  content: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'contestId' | 'subject' | 'isRead' | 'createdAt' | 'updatedAt'> {}

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public contestId?: number;
  public subject?: string;
  public content!: string;
  public isRead!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    receiverId: {
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
    subject: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message content is required'
        }
      }
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: true,
    indexes: [
      {
        fields: ['senderId']
      },
      {
        fields: ['receiverId']
      },
      {
        fields: ['contestId']
      },
      {
        fields: ['isRead']
      }
    ]
  }
);

// Define associations
Message.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender'
});

Message.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver'
});

Message.belongsTo(Contest, {
  foreignKey: 'contestId',
  as: 'contest'
});

User.hasMany(Message, {
  foreignKey: 'senderId',
  as: 'sentMessages'
});

User.hasMany(Message, {
  foreignKey: 'receiverId',
  as: 'receivedMessages'
});

Contest.hasMany(Message, {
  foreignKey: 'contestId',
  as: 'messages'
});

export default Message;

