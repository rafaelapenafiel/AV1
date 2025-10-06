import { TipoAeronave } from "../enums/enums";
import { Peca } from "./peca";
import { Etapa } from "./etapa";
import { Teste } from "./teste";

export class Aeronave {
  public pecas: Peca[] = [];
  public etapas: Etapa[] = [];
  public testes: Teste[] = [];

  constructor(
    public codigo: string,
    public modelo: string,
    public tipo: TipoAeronave,
    public capacidade: number,
    public alcance: number
  ) {}

  adicionarPeca(peca: Peca) {
    this.pecas.push(peca);
  }

  adicionarEtapa(etapa: Etapa) {
    this.etapas.push(etapa);
  }

  adicionarTeste(teste: Teste) {
    this.testes.push(teste);
  }

  detalhes(): string {
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