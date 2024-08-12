import { Controller, Post } from '@nestjs/common';
import { BackupService } from './backup.service'; // Adjust the path as necessary

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('manual')
  async triggerBackup() {
    await this.backupService.backupDatabase();
    return { message: 'Backup triggered manually' };
  }
}
