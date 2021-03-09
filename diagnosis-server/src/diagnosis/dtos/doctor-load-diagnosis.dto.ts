import { CoreOutput } from '../../common/dtos/output.dto';
import { Diagnosis } from '../../../../domains/domains';

export class LoadDoctorDiagnosisOutput extends CoreOutput {
  diagnosis?: Diagnosis[];
}
