import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from '../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({ default: 'testingEmail@naver.com' })
  @IsString()
  email: string;

  @ApiProperty({ default: '1111' })
  @IsString()
  password: string;
}

export class LoginOutput extends CoreOutput {
  @ApiProperty({ description: 'it will be return jwt token' })
  token?: string;
}
