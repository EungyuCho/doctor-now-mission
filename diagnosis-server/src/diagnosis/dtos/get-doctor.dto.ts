import { CoreOutput } from '../../common/dtos/output.dto';
import { User } from '../../../../domains/domains';
import { ApiProperty } from '@nestjs/swagger';

export class GetDoctorsOutput extends CoreOutput {
  @ApiProperty({ nullable: true, type: [User] })
  doctors?: User[];
}
