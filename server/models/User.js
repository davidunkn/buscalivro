const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = Schema(
    {
        email:
        {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            validate: [
                (val) => /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(val),
            ]
        },

        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 6
        },

        refreshToken: String
    },
    {
        virtuals: {
            fullName: {
                get() {
                    return this.firstName + ' ' + this.lastName
                }
            },
            userId: {
                get() {
                    return this._id.toString()
                }
            }
        }
    }
)

module.exports = mongoose.model('User', UserSchema)