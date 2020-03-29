module.exports = {
    db: {
        uri: 'mongodb+srv://katieohern:beastcat@heroku-vvdkq.mongodb.net/test?retryWrites=true&w=majority', //production horoscope Database
    },
    test_db: {
        uri: 'mongodb+srv://user:pass123@heavanlywriting-s5nrx.mongodb.net/test?retryWrites=true&w=majority', //currently used as the personInfo database
    }
};