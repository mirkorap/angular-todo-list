import { NgModule } from '@angular/core';
import { NoteRoutingModule } from './note-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, NoteRoutingModule]
})
export class NoteModule {}
