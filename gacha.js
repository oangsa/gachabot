var Chance = require('chance');
var chance = new Chance();

var roll = function() {
    return chance.integer({ min: 1, max: 100 })
}

var pull = function() {

    var result = roll();
//1% dm grim
//5% rb grim
//10% 500K gems
//20% 200K gems
    if(result == 1) {
        return 'hatched Legendary Dark Matter Grim Reaper'
    };

    if(result >= 2 && result <= 11) {
        return 'hatched Legendary Rainbow Grim Reaper'
    };

    if(result >= 11 && result <= 15) {
        return 'got 500K Gems'
    };
    if(result >= 15 && result <= 34) {
        return 'got 200K Gems'
    }
    else
        return 'got Salt';
}

module.exports.roll = roll
module.exports.pull = pull