import * as fromServices from './services';
import { NoteEffects, noteFeatureKey, noteReducer } from './store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NoteRoutingModule } from './note-routing.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    NoteRoutingModule,
    EffectsModule.forFeature([NoteEffects]),
    StoreModule.forFeature(noteFeatureKey, noteReducer),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: fromServices.NoteRepositoryService,
      useClass: fromServices.FirebaseNoteRepositoryService
    },
    {
      provide: fromServices.NoteStoreFacadeService,
      useClass: fromServices.NgrxNoteFacadeService
    }
  ]
})
export class NoteModule {}
