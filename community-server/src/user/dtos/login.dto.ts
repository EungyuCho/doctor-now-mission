import { CoreOutput } from '../../../../commons/commons/dtos';

export class LoginInput {
  email: string;
  password: string;
}

export class LoginOutput extends CoreOutput {
  token?: string;
}
