import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  GatewayTimeoutException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  GerarRespostaInput,
  GerarRespostaOutput,
  GerarRespostaChamadoInput,
  GerarRespostaChamadoOutput,
  ModeloProvider,
  ModeloChamadoProvider,
} from './modelo.provider.js';
import { ChamadoCategoria } from '../../chamados/chamado-categoria.js';

interface OllamaChatResponse {
  model: string;
  message?: {
    role: string;
    content: string;
  };
  done: boolean;
  prompt_eval_count?: number;
  eval_count?: number;
  categoria?: ChamadoCategoria
}



@Injectable()
export class OllamaProvider implements ModeloChamadoProvider {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async gerarChamado(input: GerarRespostaChamadoInput): Promise<GerarRespostaChamadoOutput> {
    const baseUrl = this.config.getOrThrow<string>('OLLAMA_BASE_URL');
    const model = this.config.getOrThrow<string>('OLLAMA_MODEL');
    const timeout = Number(
      this.config.get<string>('OLLAMA_TIMEOUT_MS') ?? '30000',
    );

    try {
      const response = await this.http.axiosRef.post<OllamaChatResponse>(
        `${baseUrl}/api/chat`,
        {
          model,
          messages: [
            {
              role: 'user',
              content: input.texto,
            },
          ],
          stream: false,
        },
        { timeout },
      );

      const content = response.data.message?.content?.trim();

      if (!content) {
        throw new BadGatewayException('Resposta inválida do modelo');
      }

      const categoria = response.data.categoria;

      if (categoria === undefined) {
        throw new BadGatewayException('O modelo retornou uma categoria inválida');
      }

      return {
        texto: content,
        categoria,
        modelo: response.data.model,
      };
    } catch (error: unknown) {
      if (error instanceof BadGatewayException) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
          throw new GatewayTimeoutException(
            'Tempo limite da inferência excedido',
          );
        }

        if (error.code === 'ECONNREFUSED') {
          throw new ServiceUnavailableException(
            'Servidor de IA indisponível',
          );
        }
      }

      throw new BadGatewayException('Falha ao consultar o modelo');
    }
  }
}