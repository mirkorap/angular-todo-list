import { INoteDto, NoteDto } from '@note/data-transfer-objects/note';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Note } from '@note/entities/note';
import { NoteFailure } from '@note/failures/note-failure';
import { NoteRepositoryService } from './note-repository.service';

@Injectable()
export class FirebaseNoteRepositoryService implements NoteRepositoryService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  watchAll(): Observable<NoteFailure | Note[]> {
    return this.auth.user.pipe(
      switchMap((firebaseUser) => {
        if (!firebaseUser) {
          return of([]);
        }

        return this.firestore
          .collection('users')
          .doc(firebaseUser.uid)
          .collection<Omit<INoteDto, 'id'>>('notes')
          .snapshotChanges()
          .pipe(
            map((noteDocs) => {
              return noteDocs.map((noteDoc) =>
                NoteDto.fromFirebase(noteDoc.payload.doc).toDomain()
              );
            })
          );
      }),
      catchError(() => {
        return of(NoteFailure.INSUFFICIENT_PERMISSIONS);
      })
    );
  }

  async create(note: Note): Promise<NoteFailure | Note> {
    try {
      const firebaseUser = await this.auth.currentUser;
      const { id, ...noteDto } = NoteDto.fromDomain(note).toObject();

      await this.firestore
        .collection('users')
        .doc(firebaseUser?.uid)
        .collection('notes')
        .doc(id)
        .set(noteDto);
    } catch (error) {
      return NoteFailure.SERVER_ERROR;
    }

    return note;
  }

  async update(note: Note): Promise<NoteFailure | Note> {
    try {
      const firebaseUser = await this.auth.currentUser;
      const { id, ...noteDto } = NoteDto.fromDomain(note).toObject();

      await this.firestore
        .collection('users')
        .doc(firebaseUser?.uid)
        .collection('notes')
        .doc(id)
        .update(noteDto);
    } catch (error) {
      return NoteFailure.SERVER_ERROR;
    }

    return note;
  }

  async delete(note: Note): Promise<NoteFailure | Note> {
    try {
      const firebaseUser = await this.auth.currentUser;

      await this.firestore
        .collection('users')
        .doc(firebaseUser?.uid)
        .collection('notes')
        .doc(note.id.value)
        .delete();
    } catch (error) {
      return NoteFailure.SERVER_ERROR;
    }

    return note;
  }
}
