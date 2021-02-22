import * as fromServices from './services';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { NoteRoutingModule } from './note-routing.module';
import { SharedModule } from '@shared/shared.module';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    NoteRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: fromServices.NoteRepositoryService,
      useClass: fromServices.FirebaseNoteRepositoryService
    }
  ]
})
export class NoteModule {}
