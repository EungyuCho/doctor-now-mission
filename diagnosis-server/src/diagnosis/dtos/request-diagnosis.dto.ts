import { CoreOutput } from '../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class RequestDiagnosisInput {
  @IsString()
  symptom: string;
}

export class RequestDiagnosisOutput extends CoreOutput {}
