import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board, Comment, User } from '../../../domains/domains';
import { Repository } from 'typeorm';
import { UpdateBoardInput } from './dtos/update-board.dto';

const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(),
});

type BoardMockRepository<T = any> = Partial<
  Record<keyof Repository<Board>, jest.Mock>
>;

type CommentMockRepository<T = any> = Partial<
  Record<keyof Repository<Comment>, jest.Mock>
>;

describe('CommunityService', () => {
  let service: CommunityService;
  let boardRepository: BoardMockRepository<Board>;
  let CommentRepository: CommentMockRepository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        {
          provide: getRepositoryToken(Board),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    boardRepository = module.get(getRepositoryToken(Board));
    CommentRepository = module.get(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateBoard', () => {
    const createBoardArg = {
      title: 'test',
      content: 'testing',
    };
    const user: User = new User();
    const combinedBoardArgs = {
      ...createBoardArg,
      ...user,
    };
    it('should be fail on exception', async () => {
      boardRepository.save.mockRejectedValue(new Error());

      const result = await service.createBoard(createBoardArg, user);
      expect(result).toEqual({ ok: false, error: 'Could not create board' });
    });

    it('should be create board on success', async () => {
      boardRepository.create.mockReturnValue(combinedBoardArgs);
      boardRepository.save.mockResolvedValue(combinedBoardArgs);

      const result = await service.createBoard(createBoardArg, user);

      expect(boardRepository.create).toHaveBeenCalledTimes(1);
      expect(boardRepository.create).toHaveBeenCalledWith({
        ...createBoardArg,
        user,
      });

      expect(boardRepository.save).toHaveBeenCalledTimes(1);
      expect(boardRepository.save).toHaveBeenCalledWith(combinedBoardArgs);

      expect(result).toEqual({ ok: true });
    });
  });

  describe('SearchBoard', () => {
    const boards = [new Board()];

    it('should be fail on exception', async () => {
      const errorBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnValue(new Error()),
        getMany: jest.fn().mockRejectedValue(new Error()),
      };
      boardRepository.createQueryBuilder.mockReturnValue(errorBuilder);

      const result = await service.searchBoard({});
      expect(result).toEqual({ ok: false, error: 'Could not search boards' });
    });

    it('should be return boards(With none query)', async () => {
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(boards),
      };
      boardRepository.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await service.searchBoard({});
      expect(queryBuilderMock.orderBy).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.getMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: true, boards });
    });

    it('should be return boards(With none query)', async () => {
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(boards),
      };
      boardRepository.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await service.searchBoard({});
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledTimes(0);
      expect(queryBuilderMock.where).toHaveBeenCalledTimes(0);
      expect(queryBuilderMock.getMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: true, boards });
    });

    it('should be return boards(With title)', async () => {
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(boards),
      };
      boardRepository.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await service.searchBoard({ title: 'title' });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.where).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.andWhere).toHaveBeenCalledTimes(0);
      expect(queryBuilderMock.getMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: true, boards });
    });

    it('should be return boards(With author)', async () => {
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(boards),
      };
      boardRepository.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await service.searchBoard({ author: 'author' });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.where).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.andWhere).toHaveBeenCalledTimes(0);
      expect(queryBuilderMock.getMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: true, boards });
    });

    it('should be return boards(With title and author)', async () => {
      const queryBuilderMock = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(boards),
      };
      boardRepository.createQueryBuilder.mockReturnValue(queryBuilderMock);
      const result = await service.searchBoard({
        title: 'title',
        author: 'author',
      });
      expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.where).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.andWhere).toHaveBeenCalledTimes(1);
      expect(queryBuilderMock.getMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: true, boards });
    });
  });

  describe('OpenBoard', () => {
    const boardId = 1;
    const board = new Board();
    it('should be fail on exception', async () => {
      boardRepository.findOne.mockRejectedValue(new Error());
      const result = await service.openBoard(boardId);
      expect(result).toEqual({ ok: false, error: 'Could not open board' });
    });

    it('should be fail on board not exists', async () => {
      boardRepository.findOne.mockResolvedValue(undefined);
      const result = await service.openBoard(boardId);
      expect(result).toEqual({ ok: false, error: 'Could not find board' });
    });

    it('should return board', async () => {
      boardRepository.findOne.mockResolvedValue(board);
      const result = await service.openBoard(boardId);

      expect(boardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(boardRepository.findOne).toHaveBeenCalledWith({ id: boardId });
      expect(result).toEqual({ ok: true, board });
    });
  });

  describe('patchBoard', () => {
    const boardId = 1;
    const patchBoardArgs: UpdateBoardInput = {};
    const authUser = new User();
    authUser.id = 1;

    it('it should be fail on exception', async () => {
      boardRepository.findOne.mockRejectedValue(new Error());
      const result = await service.patchBoard(boardId, {}, authUser);
      expect(result).toEqual({ ok: false, error: 'Could not update board' });
    });

    it('it should be fail on board not exists', async () => {
      boardRepository.findOne.mockResolvedValue(undefined);
      const result = await service.patchBoard(boardId, {}, authUser);
      expect(result).toEqual({ ok: false, error: 'Could not find board' });
    });

    it('it should be fail on request user is not owner', async () => {
      const board = {
        userId: 1111,
      };
      boardRepository.findOne.mockResolvedValue(board);
      const result = await service.patchBoard(boardId, {}, authUser);
      expect(result).toEqual({ ok: false, error: 'You are not owner' });
    });

    it('it should be change(title)', async () => {
      const board = {
        userId: authUser.id,
        title: 'before title',
        content: 'before content',
      };
      boardRepository.findOne.mockResolvedValue(board);
      const result = await service.patchBoard(
        boardId,
        { title: 'after title' },
        authUser,
      );
      expect(boardRepository.findOne).toHaveBeenCalledTimes(1);
      expect(boardRepository.findOne).toHaveBeenCalledWith({ id: boardId });
      expect(boardRepository.save).toHaveBeenCalledTimes(1);
      expect(boardRepository.save).toHaveBeenCalledWith({
        ...board,
        title: 'after title',
      });

      expect(result).toEqual({ ok: true });
    });
    it('it should be change(content)', async () => {
      const board = {
        userId: authUser.id,
        title: 'before title',
        content: 'before content',
      };
      boardRepository.findOne.mockResolvedValue(board);
      const result = await service.patchBoard(
        boardId,
        { content: 'after content' },
        authUser,
      );
      expect(boardRepository.save).toHaveBeenCalledWith({
        ...board,
        content: 'after content',
      });

      expect(result).toEqual({ ok: true });
    });
    it('it should be change(title and content)', async () => {
      const board = {
        userId: authUser.id,
        title: 'before title',
        content: 'before content',
      };
      boardRepository.findOne.mockResolvedValue(board);
      const result = await service.patchBoard(
        boardId,
        { title: 'after title', content: 'after content' },
        authUser,
      );
      expect(boardRepository.save).toHaveBeenCalledWith({
        ...board,
        title: 'after title',
        content: 'after content',
      });

      expect(result).toEqual({ ok: true });
    });
  });
});
