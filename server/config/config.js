module.exports = {
    db: {
        uri: 'mongodb+srv://katieohern:beastcat@heroku-vvdkq.mongodb.net/test?retryWrites=true&w=majority', //production userDatabase
    },
    test_db: {
        uri: 'mongodb+srv://user:gators123@testing-yclvl.mongodb.net/test?retryWrites=true&w=majority', //currently used as the personInfo database
    }
};