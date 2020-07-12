const mongoose = require('mongoose');

const connectDB = async() => {
    console.log('inside connectDB');

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true

        });
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(error + '  help catch me...');
        process.exit(1);

    }
};
//console.log(mongoose.connection.readyState);

module.exports = connectDB;