import { CoreOutput } from '../../../../commons/commons/dtos';
import { User } from '../../../../domains/domains';

export class ProfileInput {
  id: number;
}

export class ProfileOutput extends CoreOutput {
  user?: User;
}
