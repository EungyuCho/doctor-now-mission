import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Board } from '../../../../domains/domains';

export class SearchBoardInput {
  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  title?: string;
}

export class SearchBoardOutput extends CoreOutput {
  boards?: Board[];
}
