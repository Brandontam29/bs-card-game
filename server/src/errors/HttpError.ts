interface ErrorType {
    code?: number;
}

class HttpError extends Error implements ErrorType {
    constructor(message: string, errorCode: number) {
        super(message);
        this.code = errorCode;
    }
}

export { HttpError };
