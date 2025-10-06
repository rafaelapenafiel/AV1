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
const etapa_1 = require("./models/etapa");
function main() {
    console.log("\n=== Sistema de Produção de Aeronaves - Aerocode ===");
    const funcionarioLogado = autenticarOuCadastrar();
    if (!funcionarioLogado) {
        console.log("\nEncerrando o sistema... ");
        return;
    }
    console.log(`\n Bem-vindo, ${funcionarioLogado.nome}! (${funcionarioLogado.nivelPermissao})`);
    let opcao;
    do {
        console.log(`
------------------------------
1 - Cadastrar nova aeronave
2 - Listar aeronaves salvas
3 - Sair
------------------------------
`);
        opcao = readline.questionInt("Escolha uma opcao: ");
        switch (opcao) {
            case 1:
                if (funcionarioLogado.possuiPermissao("cadastrar")) {
                    cadastrarAeronave(funcionarioLogado);
                }
                else {
                    console.log(" Acesso restrito: apenas Engenheiros ou Administradores podem cadastrar aeronaves.");
                }
                break;
            case 2:
                listarAeronaves();
                break;
            case 3:
                console.log("\nEncerrando o sistema... ");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
        }
    } while (opcao !== 3);
}
function autenticarOuCadastrar() {
    const dados = arquivo_1.Arquivo.carregar("funcionarios.txt");
    const funcionarios = dados ? JSON.parse(dados) : [];
    console.log("\n1 - Fazer login");
    console.log("2 - Cadastrar novo funcionário");
    const escolha = readline.questionInt("Escolha uma opcao: ");
    if (escolha === 1) {
        const usuario = readline.question("Usuario: ");
        const senha = readline.question("Senha: ");
        const funcionarioJSON = funcionarios.find(f => f.usuario === usuario && f.senha === senha);
        if (funcionarioJSON) {
            return new funcionario_1.Funcionario(funcionarioJSON.id, funcionarioJSON.nome, funcionarioJSON.telefone, funcionarioJSON.endereco, funcionarioJSON.usuario, funcionarioJSON.senha, funcionarioJSON.nivelPermissao);
        }
        else {
            console.log(" Usuário ou senha incorretos.");
            return null;
        }
    }
    else if (escolha === 2) {
        const nome = readline.question("Nome do funcionario: ");
        const telefone = readline.question("Telefone: ");
        const endereco = readline.question("Endereço completo: ");
        const usuario = readline.question("Usuario: ");
        const senha = readline.question("Senha: ");
        const nivel = readline.questionInt("Nivel (1-Administrador, 2-Engenheiro, 3-Operador): ");
        if (funcionarios.some(f => f.usuario === usuario)) {
            console.log(" Já existe um funcionário com esse nome de usuário!");
            return null;
        }
        const nivelPermissao = nivel === 1 ? enums_1.NivelPermissao.ADMINISTRADOR :
            nivel === 2 ? enums_1.NivelPermissao.ENGENHEIRO :
                enums_1.NivelPermissao.OPERADOR;
        const novo = new funcionario_1.Funcionario(funcionarios.length + 1, nome, telefone, endereco, usuario, senha, nivelPermissao);
        funcionarios.push(novo);
        arquivo_1.Arquivo.salvar("funcionarios.txt", JSON.stringify(funcionarios, null, 2));
        console.log("\n Funcionário cadastrado com sucesso!");
        return novo;
    }
    return null;
}
function cadastrarAeronave(func) {
    console.log("\n=== Cadastro de Aeronave ===");
    const codigo = readline.question("\nCódigo da aeronave: ");
    const modelo = readline.question("Modelo: ");
    const tipoStr = readline.questionInt("Tipo (1-Comercial, 2-Militar): ");
    const capacidade = readline.questionInt("Capacidade (passageiros ou carga): ");
    const alcance = readline.questionInt("Alcance (km): ");
    const tipo = tipoStr === 2 ? enums_1.TipoAeronave.MILITAR : enums_1.TipoAeronave.COMERCIAL;
    const aeronave = new aeronave_1.Aeronave(codigo, modelo, tipo, capacidade, alcance);
    const qtdPecas = readline.questionInt("\nQuantas peças deseja cadastrar? ");
    for (let i = 0; i < qtdPecas; i++) {
        console.log(`\n--- Peça ${i + 1} ---`);
        const nomePeca = readline.question("Nome da peça: ");
        const tipoPecaStr = readline.questionInt("Tipo (1-Nacional, 2-Importada): ");
        const fornecedor = readline.question("Fornecedor: ");
        const statusStr = readline.questionInt("Status (1-Em produção, 2-Em transporte, 3-Pronta): ");
        const tipoPeca = tipoPecaStr === 2 ? enums_1.TipoPeca.IMPORTADA : enums_1.TipoPeca.NACIONAL;
        const statusPeca = statusStr === 1 ? enums_1.StatusPeca.EM_PRODUCAO :
            statusStr === 2 ? enums_1.StatusPeca.EM_TRANSPORTE :
                enums_1.StatusPeca.PRONTA;
        const peca = new peca_1.Peca(nomePeca, tipoPeca, fornecedor, statusPeca);
        aeronave.adicionarPeca(peca);
    }
    const qtdEtapas = readline.questionInt("\nQuantas etapas deseja cadastrar? ");
    for (let i = 0; i < qtdEtapas; i++) {
        console.log(`\n--- Etapa ${i + 1} ---`);
        const nomeEtapa = readline.question("Nome da etapa: ");
        const prazo = readline.question("Prazo (ex: 2025-10-20): ");
        const etapa = new etapa_1.Etapa(nomeEtapa, prazo);
        const vincular = readline.keyInYN("Deseja vincular o funcionario logado a esta etapa? ");
        if (vincular)
            etapa.adicionarFuncionario(func);
        const statusEtapaStr = readline.questionInt("Status (1-Pendente, 2-Em andamento, 3-Concluída): ");
        etapa.status =
            statusEtapaStr === 2 ? enums_1.StatusEtapa.ANDAMENTO :
                statusEtapaStr === 3 ? enums_1.StatusEtapa.CONCLUIDA :
                    enums_1.StatusEtapa.PENDENTE;
        aeronave.adicionarEtapa(etapa);
    }
    const tipoTesteStr = readline.questionInt("\nTipo de teste (1-Eletrico, 2-Hidraulico, 3-Aerodinamico): ");
    const resultadoStr = readline.questionInt("Resultado (1-Aprovado, 2-Reprovado): ");
    const tipoTeste = tipoTesteStr === 2 ? enums_1.TipoTeste.HIDRAULICO :
        tipoTesteStr === 3 ? enums_1.TipoTeste.AERODINAMICO :
            enums_1.TipoTeste.ELETRICO;
    const resultado = resultadoStr === 2 ? enums_1.ResultadoTeste.REPROVADO : enums_1.ResultadoTeste.APROVADO;
    const teste = new teste_1.Teste(tipoTeste, resultado);
    aeronave.adicionarTeste(teste);
    const dadosAero = arquivo_1.Arquivo.carregar("aeronaves.txt");
    const aeronaves = dadosAero ? JSON.parse(dadosAero) : [];
    aeronaves.push(aeronave);
    arquivo_1.Arquivo.salvar("aeronaves.txt", JSON.stringify(aeronaves, null, 2));
    const cliente = readline.question("\nNome do cliente: ");
    const relatorio = new relatorio_1.Relatorio(aeronave, cliente);
    relatorio.salvar();
    console.log("\n Relatório gerado com sucesso!");
    console.log(aeronave.detalhes());
}
function listarAeronaves() {
    const dados = arquivo_1.Arquivo.carregar("aeronaves.txt");
    if (!dados) {
        console.log("\nNenhuma aeronave cadastrada ainda.");
        return;
    }
    const aeronaves = JSON.parse(dados);
    console.log("\n=== AERONAVES SALVAS ===");
    aeronaves.forEach((a, i) => {
        console.log(`
${i + 1}) Código: ${a.codigo}
Modelo: ${a.modelo}
Tipo: ${a.tipo}
Capacidade: ${a.capacidade}
Alcance: ${a.alcance} km
Peças: ${a.pecas.length}
Etapas: ${a.etapas.length}
Testes: ${a.testes.length}
----------------------------`);
    });
}
main();
