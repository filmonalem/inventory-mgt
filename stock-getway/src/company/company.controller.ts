import { Controller, Get, Inject, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(
    @Inject('COMPANY_SERVICE') private readonly companyProxy: ClientProxy,
  ) {}

  @Post()
  create(@Payload() data: any): Observable<any> {
    return this.companyProxy.emit('createCompany', data);
  }

  @Get()
  findAllCompany() {
    return this.companyProxy.send({ cmd: 'getCompany' }, {});
  }

  @Put(':id')
  findOne(@Payload() id: number) {
    return this.companyProxy.send({ cmd: 'getOneCompany' }, id);
  }
}
