import { ApiProperty } from '@nestjs/swagger';

export class CoreOutput {
  @ApiProperty()
  error?: string;

  @ApiProperty()
  ok: boolean;
}
