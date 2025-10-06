import * as fs from "fs";

export class Arquivo {
  static salvar(caminho: string, conteudo: string): void {
    fs.writeFileSync(caminho, conteudo, { encoding: "utf-8" });
  }

  static carregar(caminho: string): string {
    if (!fs.existsSync(caminho)) return "";
    return fs.readFileSync(caminho, { encoding: "utf-8" });
  }
}