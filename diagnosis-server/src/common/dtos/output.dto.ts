import { ApiProperty } from '@nestjs/swagger';

export class CoreOutput {
  @ApiProperty({ nullable: true })
  error?: string;

  @ApiProperty()
  ok: boolean;
}
