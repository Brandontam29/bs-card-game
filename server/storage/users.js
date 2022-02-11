const users = [];

// Join user to chat
const userJoin = (id, name, avatar, lobby) => {
    const user = { id, name, avatar, lobby };

    users.push(user);

    return user;
};

// Get current user
const getCurrentUser = (id) => {
    return users.find((user) => user.id === id);
};

// User leaves chat
const userLeave = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

// Get lobby users
const getRoomUsers = (lobby) => {
    return users.filter((user) => user.lobby === lobby);
};

export { userJoin, getCurrentUser, userLeave, getRoomUsers };
