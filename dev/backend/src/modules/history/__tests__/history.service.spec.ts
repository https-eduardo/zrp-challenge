import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from '../history.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockHistoryRecord } from './__mocks__/history-record.mock';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest
              .fn()
              .mockResolvedValueOnce([1, [mockHistoryRecord]]),
            history: {
              create: jest.fn().mockResolvedValue(mockHistoryRecord),
              count: jest.fn(),
              findMany: jest.fn().mockResolvedValue([mockHistoryRecord]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new history record', async () => {
    const record = await service.createNewRecord(mockHistoryRecord);

    expect(record).toBeDefined();
    expect(record.threatName).toBe(mockHistoryRecord.threatName);
  });

  it('should retrieve history records', async () => {
    const result = await service.findManyRecords({});

    expect(result.data).toHaveLength(1);
    expect(result.data[0].threatName).toBe(mockHistoryRecord.threatName);
  });

  it('should retrieve history records with finishDate greater than now', async () => {
    const result = await service.findNotFinishedRecords();

    expect(result).toHaveLength(1);
    expect(result[0].threatName).toBe(mockHistoryRecord.threatName);
  });
});
