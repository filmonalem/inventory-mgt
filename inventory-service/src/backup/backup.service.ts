import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { spawn } from 'child_process';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);
  private readonly backupDir =
    process.env.BACKUP_DIR ||
    '/home/filmon/Documents/code/Stock-Real-Time/inventory-service';

  constructor() {
    this.ensureBackupDirectoryExists();
  }

  private ensureBackupDirectoryExists() {
    if (!existsSync(this.backupDir)) {
      try {
        mkdirSync(this.backupDir, { recursive: true });
        this.logger.log(`Created backup directory at: ${this.backupDir}`);
      } catch (error) {
        this.logger.error(
          `Failed to create backup directory: ${error.message}`,
        );
      }
    } else {
      this.logger.log(`Backup directory already exists at: ${this.backupDir}`);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async backupDatabase() {
    this.logger.log('Starting database backup...');

    const dumpCommand = 'pg_dump';
    const databaseUrl = process.env.DATABASE_URL;
    const backupFilePath = join(
      this.backupDir,
      `database_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`,
    );

    const child = spawn(dumpCommand, [
      '--clean',
      '--if-exists',
      '--file',
      backupFilePath,
      databaseUrl,
    ]);

    child.stdout.on('data', (data) => {
      this.logger.log(`pg_dump stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      this.logger.error(`pg_dump stderr: ${data}`);
    });

    child.on('error', (error) => {
      this.logger.error(`Failed to start pg_dump process: ${error.message}`);
    });

    child.on('close', (code) => {
      if (code === 0) {
        this.logger.log(
          `Database backup completed. Backup file: ${backupFilePath}`,
        );
      } else {
        this.logger.error(`pg_dump process exited with code ${code}`);
      }
    });
  }
}
