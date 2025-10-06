import * as readline from "readline-sync";
import { Aeronave } from "./models/aeronave";
import { TipoAeronave, TipoPeca, StatusPeca, TipoTeste, ResultadoTeste, NivelPermissao } from "./enums/enums";
import { Peca } from "./models/peca";
import { Teste } from "./models/teste";
import { Relatorio } from "./models/relatorio";
import { Arquivo } from "./utils/arquivo";
import { Funcionario } from "./models/funcionario";

function main() {
  console.log("\n=== Sistema de Produção de Aeronaves - Aerocode ===");

  const nome = readline.question("Nome do funcionario: ");
  const telefone = readline.question("Telefone: ");
  const endereco = readline.question("Endereço completo: ");
  const usuario = readline.question("Usuario: ");
  const senha = readline.question("Senha: ");
  const nivel = readline.questionInt("Nivel (1-Administrador, 2-Engenheiro, 3-Operador): ");

  const nivelPermissao =
    nivel === 1 ? NivelPermissao.ADMINISTRADOR :
    nivel === 2 ? NivelPermissao.ENGENHEIRO :
    NivelPermissao.OPERADOR;

  const func = new Funcionario(1, nome, telefone, endereco, usuario, senha, nivelPermissao);

  Arquivo.salvar("funcionarios.txt", JSON.stringify([func], null, 2));

  console.log("\n Funcionário cadastrado e salvo com sucesso!");

  const codigo = readline.question("\n Codigo da aeronave: ");
  const modelo = readline.question("Modelo: ");
  const tipoStr = readline.questionInt("Tipo (1-Comercial, 2-Militar): ");
  const capacidade = readline.questionInt("Capacidade: ");
  const alcance = readline.questionInt("Alcance (km): ");

  const tipo = tipoStr === 2 ? TipoAeronave.MILITAR : TipoAeronave.COMERCIAL;

  const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);

  
  const nomePeca = readline.question("\n Nome da peça: ");
  const tipoPecaStr = readline.questionInt("Tipo (1-Nacional, 2-Importada): ");
  const fornecedor = readline.question("Fornecedor: ");
  const statusStr = readline.questionInt("Status (1-Em produção, 2-Em transporte, 3-Pronta): ");

  const tipoPeca = tipoPecaStr === 2 ? TipoPeca.IMPORTADA : TipoPeca.NACIONAL;
  const statusPeca =
    statusStr === 1 ? StatusPeca.EM_PRODUCAO :
    statusStr === 2 ? StatusPeca.EM_TRANSPORTE :
    StatusPeca.PRONTA;

  const peca = new Peca(nomePeca, tipoPeca, fornecedor, statusPeca);
  aeronave.adicionarPeca(peca);

  const tipoTesteStr = readline.questionInt("\n Tipo de teste (1-Eletrico, 2-Hidraulico, 3-Aerodinamico): ");
  const resultadoStr = readline.questionInt("Resultado (1-Aprovado, 2-Reprovado): ");

  const tipoTeste =
    tipoTesteStr === 2 ? TipoTeste.HIDRAULICO :
    tipoTesteStr === 3 ? TipoTeste.AERODINAMICO :
    TipoTeste.ELETRICO;

  const resultado = resultadoStr === 2 ? ResultadoTeste.REPROVADO : ResultadoTeste.APROVADO;

  const teste = new Teste(tipoTeste, resultado);
  aeronave.adicionarTeste(teste);

  const cliente = readline.question("\n Nome do cliente: ");
  const relatorio = new Relatorio(aeronave, cliente);
  relatorio.salvar();

  console.log("\n Relatorio gerado com sucesso!");
  console.log(aeronave.detalhes());
}

main();