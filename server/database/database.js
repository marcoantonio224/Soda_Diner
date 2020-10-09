const mongoose = require('mongoose');

// Connect to MongoDB [specified] Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sodaDiner',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

// Console.log Connection
mongoose.connection.once('open', function () {
    console.log('MongoDB-Connection Successful to Soda Diner...');
}).on('error', function (error) {
    console.log('Connection error:', error);
});
