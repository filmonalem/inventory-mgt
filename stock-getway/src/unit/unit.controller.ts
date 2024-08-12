import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('unit')
@UseGuards(AuthGuard)
export class UnitController {
  constructor(@Inject('COMPANY_SERVICE') private unitProxy: ClientProxy) {}
  @Post()
  createUnit(@Body() data: any): Observable<any> {
    return this.unitProxy.emit('createUnit', data);
  }
  @Get()
  getAllUnit() {
    return this.unitProxy.send('getAllUnit', {});
  }

  @Get('search')
  searchUnits(@Query() query: string) {
    return this.unitProxy.emit('searchUnit', query);
  }
}
