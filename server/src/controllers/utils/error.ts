export class CLIError extends Error {
    public statusCode: number;
    constructor(code: number, message: string) {
        super(message)
        this.statusCode = code
        Error.captureStackTrace(this, this.constructor)
    }
}