import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from '../../common/dtos/output.dto';

export class LoginInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginOutput extends CoreOutput {
  @ApiProperty()
  token?: string;
}
