/* eslint-disable import/prefer-default-export */
/* eslint-disable no-continue */
const argumentType = (arg) => {
    const argType = typeof arg;

    // additional check because typeof null = 'object'
    if (arg === null) {
        return 'null';
    }

    if (argType !== 'object') {
        return argType;
    }

    if (Array.isArray(arg)) {
        return 'array';
    }

    return 'object';
};

export const classNames = (arr) => {
    const classes = [];

    for (let i = 0, len = arr.length; i < len; i++) {
        const current = arr[i];
        const argType = argumentType(arr[i]);

        if (argType === 'null' || argType === 'undefined') {
            continue;
        }

        if ((argType === 'string' && current.length !== 0) || argType === 'number') {
            classes.push(current);
            continue;
        }

        if (argType === 'object') {
            const keys = Object.keys(current); // looping this way is faster
            for (let j = 0, lenJ = keys.length; j < lenJ; j++) {
                if (current[keys[j]] === true) {
                    classes.push([keys[j]]);
                }
            }
            continue;
        }

        if (argType === 'array') {
            if (current.length) {
                const inner = classNames(current); // checks for [[]] which produces " "
                if (inner.length) {
                    classes.push(inner);
                }
            }
            continue;
        }
    }

    return classes.join(' ');
};
