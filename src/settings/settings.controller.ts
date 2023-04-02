import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':name')
  findByName(@Param() name: string) {
    return this.settingsService.findOne(name);
  }

  @Put()
  update(@Body() updateSettingDto: UpdateSettingDto[]) {
    return this.settingsService.update(updateSettingDto);
  }
}
