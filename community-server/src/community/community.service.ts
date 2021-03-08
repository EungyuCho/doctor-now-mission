import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, Comment, User } from '../../../domains/domains';
import { CreateBoardInput, CreateBoardOutput } from './dtos/create-board.dto';
import { SearchBoardInput, SearchBoardOutput } from './dtos/search-board.dto';

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

      const boards = await boardBuilder.orderBy('board.id', 'DESC').getMany();

      return {
        ok: true,
        boards,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not search board',
      };
    }
  }
}
