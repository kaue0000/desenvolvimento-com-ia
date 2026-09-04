import { Test } from '@nestjs/testing';
import { IaService } from './ia.service.js';
import {
  MODELO_PROVIDER,
  ModeloProvider,
} from './providers/modelo.provider.js';

describe('IaService', () => {
  let service: IaService;
  let provider: { gerar: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    provider = {
      gerar: vi.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        IaService,
        {
          provide: MODELO_PROVIDER,
          useValue: provider,
        },
      ],
    }).compile();

    service = moduleRef.get(IaService);
  });

  it('normaliza a mensagem e devolve o resultado do provider', async () => {
    provider.gerar.mockResolvedValue({
      resposta: 'Resposta simulada',
      modelo: 'modelo-de-teste',
      tokensEntrada: 10,
      tokensSaida: 4,
    });

    await expect(service.responder('  Olá  ')).resolves.toEqual({
      resposta: 'Resposta simulada',
      modelo: 'modelo-de-teste',
      tokensEntrada: 10,
      tokensSaida: 4,
    });

    expect(provider.gerar).toHaveBeenCalledWith({ mensagem: 'Olá' });
  });
});