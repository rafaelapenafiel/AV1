import { TipoPeca, StatusPeca } from "../enums/enums";

export class Peca {
  constructor(
    public nome: string,
    public tipo: TipoPeca,
    public fornecedor: string,
    public status: StatusPeca
  ) {}

  atualizarStatus(novoStatus: StatusPeca) {
    this.status = novoStatus;
  }
}