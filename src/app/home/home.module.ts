import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [WorkExperienceComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule,MaterialModule ,SharedModule],
  providers: [HomeService],
})
export class HomeModule {}
