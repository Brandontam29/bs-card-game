const currentTime = () => {
    const today = new Date();
    return today.getHours() + ':' + today.getMinutes();
};

const formatMessage = (name, text) => {
    return {
        name,
        text,
        time: currentTime(),
    };
};

export default formatMessage;
