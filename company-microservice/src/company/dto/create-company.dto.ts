import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum CompanyType {
  BRANCH = 'BRANCH',
  MAIN = 'MAIN',
}

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  companyCode: string;

  @IsNotEmpty()
  @IsEnum(CompanyType)
  companyType: string;
}
