import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from '../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginOutput extends CoreOutput {
  @ApiProperty()
  token?: string;
}
