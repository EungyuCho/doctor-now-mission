import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class UpdateBoardInput {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class UpdateBoardOutput extends CoreOutput {}
