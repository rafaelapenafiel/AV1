"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etapa = void 0;
const enums_1 = require("../enums/enums");
class Etapa {
    constructor(nome, prazo, status = enums_1.StatusEtapa.PENDENTE) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = [];
    }
    iniciar() {
        if (this.status === enums_1.StatusEtapa.PENDENTE) {
            this.status = enums_1.StatusEtapa.ANDAMENTO;
        }
    }
    finalizar() {
        if (this.status === enums_1.StatusEtapa.ANDAMENTO) {
            this.status = enums_1.StatusEtapa.CONCLUIDA;
        }
    }
    adicionarFuncionario(func) {
        if (!this.funcionarios.includes(func)) {
            this.funcionarios.push(func);
        }
    }
    listarFuncionarios() {
        if (this.funcionarios.length === 0) {
            return "Nenhum funcionário vinculado.";
        }
        return this.funcionarios.map(f => `- ${f.nome} (${f.nivelPermissao})`).join("\n");
    }
}
exports.Etapa = Etapa;
