import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, Comment, User } from '../../../domains/domains';
import { CreateBoardInput, CreateBoardOutput } from './dtos/create-board.dto';
import { SearchBoardInput, SearchBoardOutput } from './dtos/search-board.dto';
import { OpenBoardOutput } from './dtos/open-board.dto';
import { UpdateBoardInput, UpdateBoardOutput } from './dtos/update-board.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Board) private readonly boards: Repository<Board>,
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  async createBoard(
    createBoardInput: CreateBoardInput,
    user: User,
  ): Promise<CreateBoardOutput> {
    try {
      await this.boards.save(this.boards.create({ ...createBoardInput, user }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create board',
      };
    }
  }

  async searchBoard({
    author,
    title,
  }: SearchBoardInput): Promise<SearchBoardOutput> {
    try {
      const boardBuilder = this.boards.createQueryBuilder('board');

      if (author || title) {
        boardBuilder.leftJoinAndSelect('board.user', 'user');
      }

      if (author) {
        boardBuilder.where('user.name like :author', { author: `%${author}%` });
      }

      if (!author && title) {
        boardBuilder.where('board.title like :title', { title: `%${title}%` });
      }

      if (author && title) {
        boardBuilder.andWhere('board.title like :title', {
          title: `%${title}%`,
        });
      }

      boardBuilder.orderBy('board.id', 'DESC');
      const boards = await boardBuilder.getMany();

      return {
        ok: true,
        boards,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not search boards',
      };
    }
  }

  async openBoard(id: number): Promise<OpenBoardOutput> {
    try {
      const board = await this.boards.findOne({ id });

      if (!board) {
        return {
          ok: false,
          error: 'Could not find board',
        };
      }
      return {
        ok: true,
        board,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not open board',
      };
    }
  }

  async patchBoard(
    boardId: number,
    { title, content }: UpdateBoardInput,
    user: User,
  ): Promise<UpdateBoardOutput> {
    try {
      const board = await this.boards.findOne({ id: boardId });

      if (!board) {
        return {
          ok: false,
          error: 'Could not find board',
        };
      }

      if (board.userId !== user.id) {
        return {
          ok: false,
          error: 'You are not owner',
        };
      }

      if (title) {
        board.title = title;
      }

      if (content) {
        board.content = content;
      }

      await this.boards.save(board);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not update board',
      };
    }
  }
}
