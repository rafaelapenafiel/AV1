"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aeronave = void 0;
class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
    adicionarPeca(peca) {
        this.pecas.push(peca);
    }
    adicionarEtapa(etapa) {
        this.etapas.push(etapa);
    }
    adicionarTeste(teste) {
        this.testes.push(teste);
    }
    detalhes() {
        return `
==== Aeronave ${this.codigo} ====
Modelo: ${this.modelo}
Tipo: ${this.tipo}
Capacidade: ${this.capacidade}
Alcance: ${this.alcance} km
Peças: ${this.pecas.length}
Etapas: ${this.etapas.length}
Testes: ${this.testes.length}
==========================
`;
    }
}
exports.Aeronave = Aeronave;
