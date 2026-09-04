import { IsString, maxLength, MaxLength, minLength, MinLength } from 'class-validator';

export class ClassificarChamadoDTO {
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  texto!: string
}