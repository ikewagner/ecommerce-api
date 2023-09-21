"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }
    static alreadyExist(message = 'Email já está cadastrado!') {
        return new CustomErrorHandler(409, message);
    }
    static wrongCredentials(message = 'Nome de usuário ou senha estão errados!') {
        return new CustomErrorHandler(401, message);
    }
    static unAuthorized(message = 'Não autorizado') {
        return new CustomErrorHandler(401, message);
    }
    static notFound(message = '404 não encontrado') {
        return new CustomErrorHandler(404, message);
    }
    static serverError(message = 'Erro do Servidor Interno') {
        return new CustomErrorHandler(500, message);
    }
}
exports.default = CustomErrorHandler;
