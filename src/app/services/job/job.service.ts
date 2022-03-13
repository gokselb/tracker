import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job, SignUp, User } from '@tts/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private get collection() {
    return this.db.collection<Job>('jobs');
  }
  constructor(private db: AngularFirestore) {}

  public create(data: Job) {
    return this.collection.add(data);
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

  public getAll() {
    return this.collection.valueChanges({ idField: 'id' });
  }
}
