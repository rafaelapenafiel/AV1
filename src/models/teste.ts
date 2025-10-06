import { TipoTeste, ResultadoTeste } from "../enums/enums";

export class Teste {
  constructor(
    public tipo: TipoTeste,
    public resultado: ResultadoTeste
  ) {}
}
