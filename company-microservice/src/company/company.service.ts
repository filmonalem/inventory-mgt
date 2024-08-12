import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const { companyCode, companyName } = createCompanyDto;
    const checkCompany = await this.companyRepository.findOne({
      where: {
        companyCode: companyCode,
        companyName: companyName,
      },
    });

    if (checkCompany)
      return new NotFoundException(304, 'Company already exists');
    const newCompany = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(newCompany);
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async updateCompany(updateCompanyDto: UpdateCompanyDto) {
    const { companyId } = updateCompanyDto;
    const checkCompany = await this.companyRepository.findOne({
      where: {
        companyId: companyId,
      },
    });
    if (!checkCompany) return new NotFoundException(304, 'Company not found');
    return await this.companyRepository.update({ companyId }, updateCompanyDto);
  }
}
