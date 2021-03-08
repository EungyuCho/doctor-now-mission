import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardInput {
  @ApiProperty({ nullable: true, default: 'chagned title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ nullable: true, default: 'changed content' })
  @IsString()
  @IsOptional()
  content?: string;
}

export class UpdateBoardOutput extends CoreOutput {}
