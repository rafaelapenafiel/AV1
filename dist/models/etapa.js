"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etapa = void 0;
const enums_1 = require("../enums/enums");
class Etapa {
    constructor(nome, prazo, status = enums_1.StatusEtapa.PENDENTE, dataInicio, dataConclusao) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.dataInicio = dataInicio;
        this.dataConclusao = dataConclusao;
        this.funcionarios = [];
    }
    iniciar() {
        if (this.status === enums_1.StatusEtapa.PENDENTE) {
            this.status = enums_1.StatusEtapa.ANDAMENTO;
            this.dataInicio = new Date().toLocaleDateString();
            console.log(` Etapa "${this.nome}" iniciada.`);
        }
        else {
            console.log(` Etapa "${this.nome}" não pode ser iniciada (status atual: ${this.status}).`);
        }
    }
    finalizar() {
        if (this.status === enums_1.StatusEtapa.ANDAMENTO) {
            this.status = enums_1.StatusEtapa.CONCLUIDA;
            this.dataConclusao = new Date().toLocaleDateString();
            console.log(` Etapa "${this.nome}" concluída.`);
        }
        else {
            console.log(` Etapa "${this.nome}" só pode ser finalizada após ser iniciada.`);
        }
    }
    adicionarFuncionario(func) {
        if (!this.funcionarios.find(f => f.id === func.id)) {
            this.funcionarios.push(func);
            console.log(` Funcionário "${func.nome}" adicionado à etapa "${this.nome}".`);
        }
        else {
            console.log(` Funcionário "${func.nome}" já está vinculado à etapa "${this.nome}".`);
        }
    }
    listarFuncionarios() {
        if (this.funcionarios.length === 0) {
            return "Nenhum funcionário vinculado.";
        }
        return this.funcionarios
            .map(f => `- ${f.nome} (${f.nivelPermissao})`)
            .join("\n");
    }
    detalhesEtapa() {
        return `
Etapa: ${this.nome}
Status: ${this.status}
Prazo: ${this.prazo}
Início: ${this.dataInicio ?? "-"}
Conclusão: ${this.dataConclusao ?? "-"}
Funcionários:
${this.listarFuncionarios()}
------------------------------
`;
    }
}
exports.Etapa = Etapa;
