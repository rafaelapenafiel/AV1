"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peca = void 0;
class Peca {
    constructor(nome, tipo, fornecedor, status) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
    }
}
exports.Peca = Peca;
