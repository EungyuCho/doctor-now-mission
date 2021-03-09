import { CoreOutput } from '../../common/dtos/output.dto';
import { Diagnosis } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';

export class LoadDoctorDiagnosisOutput extends CoreOutput {
  @ApiProperty({ nullable: true, type: [Diagnosis] })
  diagnosis?: Diagnosis[];
}
