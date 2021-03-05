import { CoreOutput } from '../../../../commons/commons/dtos';

export class CreateAccountInput {
  email: string;
  password: string;
  name: string;
  userRole: string;
}

export class CreateAccountOutput extends CoreOutput {}
