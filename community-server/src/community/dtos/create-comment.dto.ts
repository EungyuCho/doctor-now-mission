import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentInput {
  @ApiProperty({
    default: 'very good',
  })
  @IsString()
  content: string;
}

export class CreateCommentOutput extends CoreOutput {}
