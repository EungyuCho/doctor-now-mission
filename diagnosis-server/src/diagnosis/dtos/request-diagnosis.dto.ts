import { CoreOutput } from '../../common/dtos/output.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestDiagnosisInput {
  @ApiProperty({
    default: '열이 나고 목이 아파요',
  })
  @IsString()
  symptom: string;
}

export class RequestDiagnosisOutput extends CoreOutput {}
