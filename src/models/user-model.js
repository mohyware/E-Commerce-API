const { DataTypes, Model, Sequelize } = require('sequelize');
const { sequelize } = require('../config/connect-postgres');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already exists. Please choose a different one'
            },
            validate: {
                notNull: {
                    msg: 'Please enter a username'
                },
                len: {
                    args: [3, 50],
                    msg: 'Username must be between 3 and 50 characters long'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'email already exists. Please choose a different one.'
            },
            validate: {
                notNull: {
                    msg: 'Please enter a email.'
                },
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email.'
                }
            }
        },
        role: {
            type: DataTypes.ENUM("User", "Admin"),
            allowNull: false,
            defaultValue: "User",
            validate: {
                isIn: {
                    args: [["User", "Admin"]],
                    msg: "Role must be either 'User' or 'Admin'.",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a Password'
                }
            }
        },
    },
    {
        modelName: "users",
        sequelize,
        timestamps: true
    },
);

User.beforeSave(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
})

User.prototype.createJWT = function () {
    return jwt.sign(
        { id: this.id, userName: this.userName },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

User.prototype.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports = User

// The issue is that the thrown errors are not being added to the errors array.

/*     let value = user.password
    if (value.length < 8 || value.length > 32) {
        new Sequelize.ValidationError('Password must be between 8 and 32 characters.')
    }

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|-]/.test(value);
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        throw new Sequelize.ValidationError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } 
*/