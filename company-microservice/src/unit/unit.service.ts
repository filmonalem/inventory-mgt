import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit) private unitRepo: Repository<Unit>,
    private readonly paginationService: UtilityService,
  ) {}
  async createUnit(createUnitDto: CreateUnitDto) {
    const checkUnit = await this.unitRepo.findOneBy({
      unitName: createUnitDto.unitName,
    });
    if (checkUnit) {
      return new NotFoundException(`unit is already created`);
    }
    const unit = this.unitRepo.create(createUnitDto);
    return await this.unitRepo.save(unit);
  }

  async getAllUnit(page = 1, limit = 100) {
    const query = this.unitRepo.createQueryBuilder('unit');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async searchUnits(searchTerm: string) {
    const query = Object.values(searchTerm);
    return await this.unitRepo.find({
      where: [{ unitName: Like(`%${query}%`) }],
    });
  }
}
