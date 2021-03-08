import { User } from '../../../../domains/domains';
import { CoreOutput } from '../../common/dtos/output.dto';
import { IsNumber } from 'class-validator';

export class ProfileInput {
  @IsNumber()
  id: number;
}

export class ProfileOutput extends CoreOutput {
  user?: User;
}
