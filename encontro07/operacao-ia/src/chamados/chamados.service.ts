import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  GerarRespostaChamadoOutput,
  MODELO_PROVIDER,
} from '../ia/providers/modelo.provider.js';
import type { ModeloChamadoProvider } from '../ia/providers/modelo.provider.js';

@Injectable()
export class ChamadosService {
  constructor(
    @Inject(MODELO_PROVIDER)
    private readonly modelo: ModeloChamadoProvider,
  ) {}

  responder(mensagem: string): Promise<GerarRespostaChamadoOutput> {
    const mensagemNormalizada = mensagem.trim();

    if (!mensagemNormalizada) {
      throw new BadRequestException('A mensagem não pode conter apenas espaços');
    }

    return this.modelo.gerarChamado({texto: mensagemNormalizada}) as Promise<GerarRespostaChamadoOutput>;
  }
}