import { CoreOutput } from '../../common/dtos/output.dto';
import { Board } from '../../../../domains/domains';

export class OpenBoardOutput extends CoreOutput {
  board?: Board;
}
