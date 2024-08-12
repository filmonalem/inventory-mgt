import { Controller, Get, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @MessagePattern('createCompany')
  async create(@Payload() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  @MessagePattern('findAllCompany')
  async findAll() {
    return await this.companyService.findAll();
  }

  @Put(':id')
  @MessagePattern('updateCompany')
  async update(@Payload() updateCompanyDto: UpdateCompanyDto) {
    return await this.companyService.updateCompany(updateCompanyDto);
  }
}
