import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class CreateBoardInput {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class CreateBoardOutput extends CoreOutput {}
