import * as fromServices from './services';
import * as fromStore from './store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteOverviewPageComponent } from './pages/note-overview-page/note-overview-page.component';
import { NoteRoutingModule } from './note-routing.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [NoteOverviewPageComponent, NoteCardComponent],
  imports: [
    SharedModule,
    NoteRoutingModule,
    EffectsModule.forFeature([
      fromStore.NoteOverviewEffects,
      fromStore.NoteEffects
    ]),
    StoreModule.forFeature(fromStore.noteFeatureKey, fromStore.noteReducer),
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
