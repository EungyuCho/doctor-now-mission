import { CoreOutput } from '../../common/dtos/output.dto';
import { User } from '../../../../domains/domains';

export class GetDoctorsOutput extends CoreOutput {
  doctors?: User[];
}
