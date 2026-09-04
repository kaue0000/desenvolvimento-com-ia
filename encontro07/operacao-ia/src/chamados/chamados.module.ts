import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChamadosController } from './chamados.controller.js';
import { ChamadosService } from './chamados.service.js';
import {
  MODELO_PROVIDER,
} from '../ia/providers/modelo.provider.js';
import { OllamaProvider } from '../ia/providers/ollama.provider.js';

@Module({
  imports: [HttpModule],
  controllers: [ChamadosController],
  providers: [
    ChamadosService,
    {
      provide: MODELO_PROVIDER,
      useClass: OllamaProvider,
    },
  ],
})
export class ChamadosModule {}