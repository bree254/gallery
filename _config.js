require('dotenv').config();

var config = {}

// MongoDB configuration using environment variables
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

config.mongoURI = {
    production: `mongodb+srv://${username}:${password}@${cluster}/darkroom?retryWrites=true&w=majority&appName=gallery-app-cluster`,
    development: `mongodb+srv://${username}:${password}@${cluster}/darkroom-dev?retryWrites=true&w=majority&appName=gallery-app-cluster`,
    test: `mongodb+srv://${username}:${password}@${cluster}/darkroom-test?retryWrites=true&w=majority&appName=gallery-app-cluster`,
}
module.exports = config;
