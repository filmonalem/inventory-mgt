import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    @Inject('COMPANY_SERVICE') private readonly userProxy: ClientProxy,
  ) {}

  @Get()
  findAllUser() {
    return this.userProxy.send({ cmd: 'getAllUser' }, {});
  }

  @Get(':id')
  findOneUser(@Payload() id: string) {
    return this.userProxy.send({ cmd: 'getOneUser' }, id);
  }
}
