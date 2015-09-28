module.exports = function(){
    var world = require('./world');

    helloworld = 'Hello ' + world() +'!';

    return helloworld;
};
