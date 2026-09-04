import { Body, Controller, Post } from '@nestjs/common';
import { ClassificarChamadoDTO } from './dto/classificar-chamado.dto.js';
import { ChamadosService } from './chamados.service.js';

@Controller('chamados')
export class ChamadosController {
  constructor(private readonly chamadosService: ChamadosService) {}

  @Post('classificar')
  async responder(@Body() dto: ClassificarChamadoDTO) {
    const resultado = await this.chamadosService.responder(dto.texto);

    return {
      texto: resultado.texto,
      categoria: resultado.categoria,
      modelo: resultado.modelo,
    };
  }
}