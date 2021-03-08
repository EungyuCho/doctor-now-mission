import { CoreOutput } from '../../common/dtos/output.dto';
import { Board } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';

export class OpenBoardOutput extends CoreOutput {
  @ApiProperty({ nullable: true })
  board?: Board;
}
