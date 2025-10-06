"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arquivo = void 0;
const fs = require("fs");
class Arquivo {
    static salvar(caminho, conteudo) {
        fs.writeFileSync(caminho, conteudo, { encoding: "utf-8" });
    }
    static carregar(caminho) {
        if (!fs.existsSync(caminho))
            return "";
        return fs.readFileSync(caminho, { encoding: "utf-8" });
    }
}
exports.Arquivo = Arquivo;
