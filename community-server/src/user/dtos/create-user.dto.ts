import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from '../../common/dtos/output.dto';
import { IsEmail, IsString } from 'class-validator';

export class CreateAccountInput {
  @ApiProperty({ default: 'testingEmail@naver.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1111' })
  @IsString()
  password: string;

  @ApiProperty({ default: 'testing user' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'user', description: 'it will be user or doctor' })
  @IsString()
  userRole: string;
}

export class CreateAccountOutput extends CoreOutput {}
