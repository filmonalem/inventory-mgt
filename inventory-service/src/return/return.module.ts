import { Module } from '@nestjs/common';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { UtilityModule } from 'src/utility/utility.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [TypeOrmModule.forFeature([Return]), UtilityModule, StockModule],
  controllers: [ReturnController],
  providers: [ReturnService],
})
export class ReturnModule {}
