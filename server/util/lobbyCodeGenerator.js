import ShortUniqueId from 'short-unique-id';

const options = {
    length: 6,
    dictionary: 'alpha_upper',
};

const lobbyCode = new ShortUniqueId(options);

export default lobbyCode;
