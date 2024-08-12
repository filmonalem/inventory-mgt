import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { UnitModule } from './unit/unit.module';
import { CategoryModule } from './category/category.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    DatabaseModule,
    UnitModule,
    CategoryModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
