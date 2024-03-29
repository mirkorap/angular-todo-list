import * as fromComponents from './components';
import * as fromPages from './pages';
import * as fromResolvers from './resolvers';
import * as fromServices from './services';
import * as fromStore from './store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NoteExistsGuard } from './guards/note-exists.guard';
import { NoteRoutingModule } from './note-routing.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [
    fromComponents.NoteCardComponent,
    fromComponents.NoteFormComponent,
    fromComponents.TodoItemComponent,
    fromPages.NoteFormPageComponent,
    fromPages.NoteOverviewPageComponent
  ],
  imports: [
    StoreModule.forFeature(fromStore.noteFeatureKey, fromStore.noteReducer),
    EffectsModule.forFeature([
      fromStore.NoteOverviewEffects,
      fromStore.NoteEffects
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    NoteRoutingModule
  ],
  providers: [
    NoteExistsGuard,
    fromResolvers.NoteFormResolver,
    fromResolvers.NoteStateResolver,
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
