const ReverseMd5 = require('reverse-md5')


const rev = ReverseMd5({
    lettersUpper: false,
    lettersLower: true,
    numbers: true,
    special: false,
    whitespace: true,
    maxLen: 12
});

module.exports = rev;