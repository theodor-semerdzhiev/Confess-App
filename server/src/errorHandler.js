require('express-async-errors');

module.exports = function(){
    process.on('uncaughtException', (ex) => {
        console.log(ex);
    });
    process.on('unhandledRejection', (ex) => {
        console.log(ex);
    });
};