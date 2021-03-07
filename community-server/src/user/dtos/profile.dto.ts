import { User } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from '../../common/dtos/output.dto';
import { IsNumber } from 'class-validator';

export class ProfileInput {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class ProfileOutput extends CoreOutput {
  @ApiProperty()
  user?: User;
}
