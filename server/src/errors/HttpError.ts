export class HttpError extends Error {
    private _status: number = 0;

    constructor(message: string, status: number) {
        super(message);
        this._status = status;
    }

    get statusCode(): number {
        return this._status;
    }

    set statusCode(code: number) {
        this._status = code;
    }
}

/**
 * Informational responses (100–199)
 * Successful responses (200–299)
 * Redirection messages (300–399)
 * Client error responses (400–499)
 * Server error responses (500–599)
 */
