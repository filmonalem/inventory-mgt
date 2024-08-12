import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Like, Repository } from 'typeorm';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    private readonly paginationService: UtilityService,
  ) {}

  async createClient(createClientDto: CreateClientDto) {
    const checkClient = await this.clientRepo.findOneBy({
      phone: createClientDto.phone,
    });
    if (checkClient) {
      throw new NotFoundException(`Client is already created !`);
    }
    const client = this.clientRepo.create({
      ...createClientDto,
    });
    return await this.clientRepo.save(client);
  }

  async getAllClient(page: number = 1, limit: number = 100) {
    const query = this.clientRepo.createQueryBuilder('client');
    return await this.paginationService.paginateAndFetch(query, page, limit);
  }

  async getClient(clientId: string) {
    return await this.clientRepo.findOne({ where: { clientId } });
  }

  async updateClient(clientId: string, updateClientDto: UpdateClientDto) {
    return await this.clientRepo.update(clientId, updateClientDto);
  }
  async deactivateClient(clientId: string) {
    const client = await this.clientRepo.findOne({ where: { clientId } });
    if (client) {
      client.isActive = false;
      return this.clientRepo.save(client);
    }
    return new NotFoundException('client not found');
  }
  async searchClients(searchTerm: string) {
    const query = Object.values(searchTerm);
    return await this.clientRepo.find({
      where: { fullName: Like(`%${query}%`) },
    });
  }
}
