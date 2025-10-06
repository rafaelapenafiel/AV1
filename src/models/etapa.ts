import { StatusEtapa } from "../enums/enums";
import { Funcionario } from "./funcionario";

export class Etapa {
  private funcionarios: Funcionario[] = [];

  constructor(
    public nome: string,
    public prazo: string, 
    public status: StatusEtapa = StatusEtapa.PENDENTE,
    public dataInicio?: string,
    public dataConclusao?: string
  ) {}

  iniciar(): void {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO;
      this.dataInicio = new Date().toLocaleDateString();
      console.log(` Etapa "${this.nome}" iniciada.`);
    } else {
      console.log(` Etapa "${this.nome}" não pode ser iniciada (status atual: ${this.status}).`);
    }
  }

  finalizar(): void {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA;
      this.dataConclusao = new Date().toLocaleDateString();
      console.log(` Etapa "${this.nome}" concluída.`);
    } else {
      console.log(` Etapa "${this.nome}" só pode ser finalizada após ser iniciada.`);
    }
  }

  adicionarFuncionario(func: Funcionario): void {
    if (!this.funcionarios.find(f => f.id === func.id)) {
      this.funcionarios.push(func);
      console.log(` Funcionário "${func.nome}" adicionado à etapa "${this.nome}".`);
    } else {
      console.log(` Funcionário "${func.nome}" já está vinculado à etapa "${this.nome}".`);
    }
  }

  listarFuncionarios(): string {
    if (this.funcionarios.length === 0) {
      return "Nenhum funcionário vinculado.";
    }
    return this.funcionarios
      .map(f => `- ${f.nome} (${f.nivelPermissao})`)
      .join("\n");
  }

  detalhesEtapa(): string {
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