import { CoreOutput } from '../../common/dtos/output.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PrescribeInput {
  @ApiProperty({
    default: '해열제 처방',
  })
  @IsString()
  comment: string;
}
export class PrescribeOutput extends CoreOutput {}
