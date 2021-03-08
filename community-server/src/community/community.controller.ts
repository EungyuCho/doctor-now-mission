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
import { UpdateBoardInput, UpdateBoardOutput } from './dtos/update-board.dto';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import { DeleteBoardOutput } from './dtos/delete-board.dto';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { TOKEN_KEY } from '../../../commons/commons/common.constants';

@Controller('api/community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(User Only)' })
  @ApiResponse({ type: CreateBoardOutput })
  @Role(['USER'])
  @Post('board')
  createBoard(
    @Body() createBoardInput: CreateBoardInput,
    @AuthUser() user: User,
  ): Promise<CreateBoardOutput> {
    return this.communityService.createBoard(createBoardInput, user);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify' })
  @ApiResponse({ type: SearchBoardOutput })
  @Role(['Any'])
  @Get('board')
  searchBoard(
    @Query() searchBoardInput: SearchBoardInput,
  ): Promise<SearchBoardOutput> {
    return this.communityService.searchBoard(searchBoardInput);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(User Only)' })
  @ApiResponse({ type: UpdateBoardOutput })
  @Role(['USER'])
  @Patch('board/:id')
  patchBoard(
    @Body() updateBoardInput: UpdateBoardInput,
    @Param('id') boardId: number,
    @AuthUser() user: User,
  ): Promise<UpdateBoardOutput> {
    return this.communityService.patchBoard(boardId, updateBoardInput, user);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify' })
  @ApiResponse({ type: OpenBoardOutput })
  @Role(['Any'])
  @Get('board/:id')
  openBoard(@Param('id') id: number): Promise<OpenBoardOutput> {
    return this.communityService.openBoard(id);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify(User Only)' })
  @ApiResponse({ type: DeleteBoardOutput })
  @Role(['USER'])
  @Delete('board/:id')
  deleteBoard(
    @Param('id') boardId: number,
    @AuthUser() user: User,
  ): Promise<DeleteBoardOutput> {
    return this.communityService.deleteBoard(boardId, user);
  }

  @ApiHeader({ name: TOKEN_KEY, description: 'jwt token verify' })
  @ApiResponse({ type: CreateCommentOutput })
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
