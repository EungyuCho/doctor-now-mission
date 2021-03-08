import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardInput {
  @ApiProperty({
    default: 'hello world',
  })
  @IsString()
  title: string;

  @ApiProperty({
    default: 'Welcome to nest world',
  })
  @IsString()
  content: string;
}

export class CreateBoardOutput extends CoreOutput {}
