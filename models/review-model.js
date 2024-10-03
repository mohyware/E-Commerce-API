const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connect-postgres');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        helpfulnessCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('published', 'pending', 'reported'),
            defaultValue: 'published',
        },
    },
    {
        modelName: 'reviews',
        sequelize,
        timestamps: true,
    },
);

module.exports = Review;
