import { ChamadoCategoria } from "../../chamados/chamado-categoria.js";

export interface GerarRespostaInput {
  mensagem: string;
}

export interface GerarRespostaOutput {
  resposta: string;
  modelo: string;
  tokensEntrada?: number;
  tokensSaida?: number;
}

export interface GerarRespostaChamadoInput {
  texto: string;
}

export interface GerarRespostaChamadoOutput {
  texto: string;
  modelo: string;
  categoria: ChamadoCategoria;
}

export interface ModeloProvider {
  gerar(input: GerarRespostaInput): Promise<GerarRespostaOutput>;
}
export interface ModeloChamadoProvider {
  gerarChamado(input: GerarRespostaChamadoInput): Promise<GerarRespostaChamadoInput>;
}

export const MODELO_PROVIDER = Symbol('MODELO_PROVIDER');