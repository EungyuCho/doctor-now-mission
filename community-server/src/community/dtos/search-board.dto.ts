import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Board } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';

export class SearchBoardInput {
  @ApiProperty({ nullable: true, default: 'jay', required: false })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ nullable: true, default: 'hello', required: false })
  @IsString()
  @IsOptional()
  title?: string;
}

export class SearchBoardOutput extends CoreOutput {
  @ApiProperty({ nullable: true, type: [Board] })
  boards?: Board[];
}
