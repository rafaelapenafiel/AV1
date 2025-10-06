import { StatusEtapa } from "../enums/enums";
import { Funcionario } from "./funcionario";

export class Etapa {
  private funcionarios: Funcionario[] = [];

  constructor(
    public nome: string,
    public prazo: string,
    public status: StatusEtapa = StatusEtapa.PENDENTE
  ) {}

  iniciar() {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO;
    }
  }

  finalizar() {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA;
    }
  }

  adicionarFuncionario(func: Funcionario) {
    if (!this.funcionarios.includes(func)) {
      this.funcionarios.push(func);
    }
  }

  listarFuncionarios(): string {
    if (this.funcionarios.length === 0) {
        return "Nenhum funcionário vinculado.";
    }
    return this.funcionarios.map(f => `- ${f.nome} (${f.nivelPermissao})`).join("\n");
    }
}