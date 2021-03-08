import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { Role } from '../auth/role.decorator';
import { CreateBoardInput, CreateBoardOutput } from './dtos/create-board.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../../../domains/domains';
import { SearchBoardInput, SearchBoardOutput } from './dtos/search-board.dto';
import { OpenBoardOutput } from './dtos/open-board.dto';
import { UpdateBoardInput } from './dtos/update-board.dto';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import { DeleteBoardOutput } from './dtos/delete-board.dto';

@Controller('api/community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Role(['USER'])
  @Post('board')
  createBoard(
    @Body() createBoardInput: CreateBoardInput,
    @AuthUser() user: User,
  ): Promise<CreateBoardOutput> {
    return this.communityService.createBoard(createBoardInput, user);
  }

  @Role(['Any'])
  @Get('board')
  searchBoard(
    @Query() searchBoardInput: SearchBoardInput,
  ): Promise<SearchBoardOutput> {
    return this.communityService.searchBoard(searchBoardInput);
  }

  @Role(['USER'])
  @Patch('board/:id')
  patchBoard(
    @Body() updateBoardInput: UpdateBoardInput,
    @Param('id') boardId: number,
    @AuthUser() user: User,
  ) {
    return this.communityService.patchBoard(boardId, updateBoardInput, user);
  }

  @Role(['Any'])
  @Get('board/:id')
  openBoard(@Param('id') id: number): Promise<OpenBoardOutput> {
    return this.communityService.openBoard(id);
  }

  @Role(['USER'])
  @Delete('board/:id')
  deleteBoard(
    @Param('id') boardId: number,
    @AuthUser() user: User,
  ): Promise<DeleteBoardOutput> {
    return this.communityService.deleteBoard(boardId, user);
  }

  @Role(['Any'])
  @Post('board/:id/comment')
  createComment(
    @Param('id') boardId: number,
    @Body() createCommentInput: CreateCommentInput,
    @AuthUser() user: User,
  ): Promise<CreateCommentOutput> {
    return this.communityService.createComment(
      boardId,
      createCommentInput,
      user,
    );
  }
}
