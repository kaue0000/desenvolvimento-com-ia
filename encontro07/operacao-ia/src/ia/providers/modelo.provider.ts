import { ChamadoCategoria } from "../../chamados/chamado-categoria.js";

export interface GerarRespostaChamadoInput {
  texto: string;
}

export interface GerarRespostaChamadoOutput {
  texto: string;
  modelo: string;
  categoria: ChamadoCategoria;
}

export interface ModeloChamadoProvider {
  gerarChamado(input: GerarRespostaChamadoInput): Promise<GerarRespostaChamadoInput>;
}

export const MODELO_PROVIDER = Symbol('MODELO_PROVIDER');