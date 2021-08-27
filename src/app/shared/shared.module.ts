import * as fromServices from '@shared/services';
import * as fromStore from '@shared/store';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingDirective } from './directives/loading.directive';
import { MaterialModule } from '../material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoadingDirective, ColorPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromStore.globalFeatureKey, fromStore.globalReducer),
    EffectsModule.forFeature([fromStore.GlobalEffects]),
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
    LoadingDirective,
    ColorPickerComponent
  ],
  providers: [
    {
      provide: fromServices.GlobalStoreFacadeService,
      useClass: fromServices.NgrxGlobalFacadeService
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
