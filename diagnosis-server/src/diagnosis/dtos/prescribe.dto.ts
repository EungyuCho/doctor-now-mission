import { CoreOutput } from '../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class PrescribeInput {
  @IsString()
  comment: string;
}
export class PrescribeOutput extends CoreOutput {}
