import { NivelPermissao } from "../enums/enums";

export class Funcionario {
  constructor(
    public id: number,
    public nome: string,
    public telefone: string,
    public endereco: string,
    public usuario: string,
    public senha: string,
    public nivelPermissao: NivelPermissao
  ) {}

  autenticar(usuario: string, senha: string): boolean {
    return this.usuario === usuario && this.senha === senha;
  }
  possuiPermissao(acao: string): boolean {
    switch (this.nivelPermissao) {
      case NivelPermissao.ADMINISTRADOR:
        return true;
      case NivelPermissao.ENGENHEIRO:
        return acao !== "gerenciarUsuarios";
      case NivelPermissao.OPERADOR:
        return acao === "visualizar" || acao === "atualizarEtapa";
      default:
        return false;
    }
  }
}