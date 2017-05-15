function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i ++) {
        value = parseInt(value, 10);
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

module.exports.findWithAttr = findWithAttr;