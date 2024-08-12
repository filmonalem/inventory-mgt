import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilityModule } from 'src/utility/utility.module';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), UtilityModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
