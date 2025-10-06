"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline-sync");
const aeronave_1 = require("./models/aeronave");
const enums_1 = require("./enums/enums");
const peca_1 = require("./models/peca");
const teste_1 = require("./models/teste");
const relatorio_1 = require("./models/relatorio");
const arquivo_1 = require("./utils/arquivo");
const funcionario_1 = require("./models/funcionario");
function main() {
    console.log("\n=== Sistema de Produção de Aeronaves - Aerocode ===");
    const nome = readline.question("Nome do funcionário: ");
    const telefone = readline.question("Telefone: ");
    const endereco = readline.question("Endereço completo: ");
    const usuario = readline.question("Usuário: ");
    const senha = readline.question("Senha: ");
    const nivel = readline.questionInt("Nível (1-Administrador, 2-Engenheiro, 3-Operador): ");
    const nivelPermissao = nivel === 1 ? enums_1.NivelPermissao.ADMINISTRADOR :
        nivel === 2 ? enums_1.NivelPermissao.ENGENHEIRO :
            enums_1.NivelPermissao.OPERADOR;
    const func = new funcionario_1.Funcionario(1, nome, telefone, endereco, usuario, senha, nivelPermissao);
    arquivo_1.Arquivo.salvar("funcionarios.txt", JSON.stringify([func], null, 2));
    console.log("\n Funcionário cadastrado e salvo com sucesso!");
    const codigo = readline.question("\nCódigo da aeronave: ");
    const modelo = readline.question("Modelo: ");
    const tipoStr = readline.questionInt("Tipo (1-Comercial, 2-Militar): ");
    const capacidade = readline.questionInt("Capacidade: ");
    const alcance = readline.questionInt("Alcance (km): ");
    const tipo = tipoStr === 2 ? enums_1.TipoAeronave.MILITAR : enums_1.TipoAeronave.COMERCIAL;
    const aeronave = new aeronave_1.Aeronave(codigo, modelo, tipo, capacidade, alcance);
    // 🔹 Cadastro de peça
    const nomePeca = readline.question("\nNome da peça: ");
    const tipoPecaStr = readline.questionInt("Tipo (1-Nacional, 2-Importada): ");
    const fornecedor = readline.question("Fornecedor: ");
    const statusStr = readline.questionInt("Status (1-Em produção, 2-Em transporte, 3-Pronta): ");
    const tipoPeca = tipoPecaStr === 2 ? enums_1.TipoPeca.IMPORTADA : enums_1.TipoPeca.NACIONAL;
    const statusPeca = statusStr === 1 ? enums_1.StatusPeca.EM_PRODUCAO :
        statusStr === 2 ? enums_1.StatusPeca.EM_TRANSPORTE :
            enums_1.StatusPeca.PRONTA;
    const peca = new peca_1.Peca(nomePeca, tipoPeca, fornecedor, statusPeca);
    aeronave.adicionarPeca(peca);
    const tipoTesteStr = readline.questionInt("\nTipo de teste (1-Elétrico, 2-Hidráulico, 3-Aerodinâmico): ");
    const resultadoStr = readline.questionInt("Resultado (1-Aprovado, 2-Reprovado): ");
    const tipoTeste = tipoTesteStr === 2 ? enums_1.TipoTeste.HIDRAULICO :
        tipoTesteStr === 3 ? enums_1.TipoTeste.AERODINAMICO :
            enums_1.TipoTeste.ELETRICO;
    const resultado = resultadoStr === 2 ? enums_1.ResultadoTeste.REPROVADO : enums_1.ResultadoTeste.APROVADO;
    const teste = new teste_1.Teste(tipoTeste, resultado);
    aeronave.adicionarTeste(teste);
    const cliente = readline.question("\nNome do cliente: ");
    const relatorio = new relatorio_1.Relatorio(aeronave, cliente);
    relatorio.salvar();
    console.log("\n✅ Relatório gerado com sucesso!");
    console.log(aeronave.detalhes());
}
main();
