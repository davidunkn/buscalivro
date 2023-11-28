const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        console.log('Database connection error:', err);
    }

}

module.exports = connect