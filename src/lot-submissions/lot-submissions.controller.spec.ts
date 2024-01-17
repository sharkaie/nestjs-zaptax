import { Test, TestingModule } from '@nestjs/testing';
import { LotSubmissionsController } from './lot-submissions.controller';
import { LotSubmissionsService } from './lot-submissions.service';

describe('LotSubmissionsController', () => {
    let controller: LotSubmissionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LotSubmissionsController],
            providers: [LotSubmissionsService],
        }).compile();

        controller = module.get<LotSubmissionsController>(
            LotSubmissionsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
