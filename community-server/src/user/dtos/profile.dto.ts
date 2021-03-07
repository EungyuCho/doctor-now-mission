import { User } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from '../../common/dtos/output.dto';

export class ProfileInput {
  @ApiProperty()
  id: number;
}

export class ProfileOutput extends CoreOutput {
  @ApiProperty()
  user?: User;
}
