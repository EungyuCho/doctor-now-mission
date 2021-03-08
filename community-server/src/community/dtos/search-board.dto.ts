import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Board } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';

export class SearchBoardInput {
  @ApiProperty({ nullable: true, default: 'jay' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ nullable: true, default: 'hello' })
  @IsString()
  @IsOptional()
  title?: string;
}

export class SearchBoardOutput extends CoreOutput {
  @ApiProperty({ nullable: true, type: [Board] })
  boards?: Board[];
}
