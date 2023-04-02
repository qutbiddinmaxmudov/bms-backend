import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { SettingsEntity } from './settings/entities/settings.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55000,
      username: 'postgres',
      password: 'postgrespw',
      database: 'bms',
      entities: [UserEntity, SettingsEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
