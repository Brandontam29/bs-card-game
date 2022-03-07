const ShortUniqueId = require('short-unique-id');

const options = {
    length: 6,
    dictionary: 'alpha_upper',
};

const lobbyCodeGenerator = () => {
    const code = new ShortUniqueId(options);

    return code();
};

module.exports = { lobbyCodeGenerator };
