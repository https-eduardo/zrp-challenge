import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from '../history.controller';
import { HistoryService } from '../history.service';
import { mockHistoryRecord } from './__mocks__/history-record.mock';

describe('HistoryController', () => {
  let controller: HistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        {
          provide: HistoryService,
          useValue: {
            findManyRecords: jest
              .fn()
              .mockResolvedValue({ data: [mockHistoryRecord] }),
          },
        },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieve history records', async () => {
    const result = await controller.findMany({});

    expect(result.data).toHaveLength(1);
    expect(result.data[0].threatName).toBe(mockHistoryRecord.threatName);
  });
});
