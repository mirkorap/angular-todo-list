import * as fromServices from './services';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingDirective } from './directives/loading.directive';
import { MaterialModule } from '../material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoadingDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      progressBar: true,
      preventDuplicates: true,
      positionClass: 'toast-top-center'
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    LoadingDirective
  ],
  providers: [
    {
      provide: fromServices.DataStorageService,
      useClass: fromServices.LocalStorageService
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
