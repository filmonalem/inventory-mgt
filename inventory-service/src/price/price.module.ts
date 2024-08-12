import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { ProductModule } from 'src/product/product.module';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), UtilityModule, ProductModule],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
