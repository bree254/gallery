var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://breezy_db_user:root@gallery-app-cluster.kt98dgw.mongodb.net/darkroom?retryWrites=true&w=majority&appName=gallery-app-cluster',
    development: 'mongodb+srv://breezy_db_user:root@gallery-app-cluster.kt98dgw.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=gallery-app-cluster',
    test: 'mongodb+srv://breezy_db_user:root@gallery-app-cluster.kt98dgw.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=gallery-app-cluster',
}
module.exports = config;
