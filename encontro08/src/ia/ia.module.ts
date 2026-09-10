import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IaController } from './ia.controller.js';
import { IaService } from './ia.service.js';
import {
  MODELO_PROVIDER,
} from './providers/modelo.provider.js';
import { OllamaProvider } from './providers/ollama.provider.js';

@Module({
  imports: [HttpModule],
  controllers: [IaController],
  providers: [
    IaService,
    {
      provide: MODELO_PROVIDER,
      useClass: OllamaProvider,
    },
  ],
})
export class IaModule {}