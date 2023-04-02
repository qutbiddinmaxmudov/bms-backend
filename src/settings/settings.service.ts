import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingsEntity } from './entities/settings.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(SettingsEntity)
    private repository: Repository<SettingsEntity>,
  ) {}

  async onModuleInit() {
    const defaultSettings: UpdateSettingDto[] = [
      {
        name: 'budget',
        value: 10000,
        accessLevel: 'owner',
      },
      {
        name: 'currency',
        value: 'USD',
        accessLevel: 'owner',
      },
    ];

    Promise.all(
      defaultSettings.map((setting) => {
        const settingEntity = this.repository.create(setting);
        this.repository.save(settingEntity);
      }),
    );
  }

  findAll(): Promise<SettingsEntity[]> {
    return this.repository.findBy({});
  }

  findOne(name: string) {
    return this.repository.findBy({ name });
  }

  update(settings: UpdateSettingDto[]) {
    return `This action updates settings`;
  }
}
