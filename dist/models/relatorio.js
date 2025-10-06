"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatorio = void 0;
const arquivo_1 = require("../utils/arquivo");
class Relatorio {
    constructor(aeronave, cliente) {
        this.aeronave = aeronave;
        this.cliente = cliente;
    }
    gerar() {
        const dataEntrega = new Date().toLocaleDateString("pt-BR");
        return `
===== RELATÓRIO FINAL =====
Cliente: ${this.cliente}
Data de entrega: ${dataEntrega}
Aeronave: ${this.aeronave.modelo} (${this.aeronave.codigo})
Tipo: ${this.aeronave.tipo}
Capacidade: ${this.aeronave.capacidade}
Alcance: ${this.aeronave.alcance} km

--- Peças ---
${this.aeronave.pecas.map(p => `${p.nome} - ${p.status}`).join("\n")}

--- Etapas ---
${this.aeronave.etapas.map(e => `${e.nome}: ${e.status}`).join("\n")}

--- Testes ---
${this.aeronave.testes.map(t => `${t.tipo}: ${t.resultado}`).join("\n")}

============================
`;
    }
    salvar() {
        const texto = this.gerar();
        const caminho = `relatorio_${this.aeronave.codigo}.txt`;
        arquivo_1.Arquivo.salvar(caminho, texto);
        console.log(`Relatório salvo em: ${caminho}`);
    }
}
exports.Relatorio = Relatorio;
