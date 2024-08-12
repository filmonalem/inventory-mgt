import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { MessagePattern } from '@nestjs/microservices';
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @MessagePattern('createClient')
  async createClient(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto);
  }

  @Get()
  @MessagePattern('getAllClient')
  async getAllClients(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return await this.clientService.getAllClient(page, limit);
  }

  @Get(':id')
  @MessagePattern('getClient')
  async getClient(@Param('id') clientId: string) {
    return await this.clientService.getClient(clientId);
  }
  @Get('search')
  @MessagePattern('searchClient')
  async searchClients(@Query() search: string) {
    return await this.clientService.searchClients(search);
  }

  @Put(':clientId')
  @MessagePattern('updateClient')
  async updateClient(
    @Param('clientId') clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.updateClient(clientId, updateClientDto);
  }

  @Patch(':clientId')
  async deactivateClient(@Param('clientId') clientId: string) {
    return this.clientService.deactivateClient(clientId);
  }
}
