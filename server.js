const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

let port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started at ${port}`);
});

const uri = "mongodb://localhost:27017/upload";
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.Promise = global.Promise;

mongoose.connect(uri, option).then(() => console.log(`DB in action`))
    .catch((err) => console.log(err));