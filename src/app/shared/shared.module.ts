import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { AddEditJobHistoryComponent } from './components/add-edit-job-history/add-edit-job-history.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [
    HeaderComponent,
    AddEditJobHistoryComponent,
    InputFieldComponent,
    LoaderComponent,
    NoDataComponent,
    ToasterComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [
    HeaderComponent,
    AddEditJobHistoryComponent,
    InputFieldComponent,
    LoaderComponent,
    NoDataComponent,
    ToasterComponent
  ],
  providers: [SharedService]
})
export class SharedModule {}
