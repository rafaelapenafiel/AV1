"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
const enums_1 = require("../enums/enums");
class Funcionario {
    constructor(id, nome, telefone, endereco, usuario, senha, nivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }
    autenticar(usuario, senha) {
        return this.usuario === usuario && this.senha === senha;
    }
    possuiPermissao(acao) {
        switch (this.nivelPermissao) {
            case enums_1.NivelPermissao.ADMINISTRADOR:
                return true;
            case enums_1.NivelPermissao.ENGENHEIRO:
                return acao !== "gerenciarUsuarios";
            case enums_1.NivelPermissao.OPERADOR:
                return acao === "visualizar" || acao === "atualizarEtapa";
            default:
                return false;
        }
    }
}
exports.Funcionario = Funcionario;
