import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperService } from './services/scraper.service';
import { KnnService } from './services/knn.service';
import { LocationModule } from './controller/location/location.module';
import { StationModule } from './controller/station/station.module';
import { LiveModule } from './controller/live/live.module';
import { LiveService } from './services/live.service';

@Module({
  imports: [StationModule,LocationModule, LiveModule],
  controllers: [AppController],
  providers: [AppService,ScraperService, KnnService, LiveService],
})
export class AppModule {}
