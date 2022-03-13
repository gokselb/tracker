import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SignUp, User } from '@tts/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private get collection() {
    return this.db.collection<User>('users');
  }
  constructor(private db: AngularFirestore) {}

  public create(data: User) {
    return this.collection.doc(data.id).set(data);
  }

  public get(id?: string) {
    return this.collection
      .doc(id)
      .get()
      .pipe(
        map((res) => {
          return res.data();
        })
      );
  }
}
