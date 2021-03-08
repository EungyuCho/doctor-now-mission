import { CoreOutput } from '../../common/dtos/output.dto';
import { Diagnosis } from '../../../../domains/domains';

export class LoadDiagnosisOutput extends CoreOutput {
  diagnostics?: Diagnosis[];
}
