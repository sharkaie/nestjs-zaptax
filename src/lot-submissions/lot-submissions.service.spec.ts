import { Test, TestingModule } from '@nestjs/testing';
import { LotSubmissionsService } from './lot-submissions.service';

describe('LotSubmissionsService', () => {
    let service: LotSubmissionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LotSubmissionsService],
        }).compile();

        service = module.get<LotSubmissionsService>(LotSubmissionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
