import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class CreateCommentInput {
  @IsString()
  content: string;
}

export class CreateCommentOutput extends CoreOutput {}
