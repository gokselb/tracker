import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job, SignUp, User } from '@tts/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AuthenticationService } from '../authentication';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private currentUid?: string;
  private get collection() {
    return this.db.collection<Job>('jobs', (ref) => {
      return ref.where('user', '==', this.currentUid);
    });
  }
  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.currentUid = this.authService.currentUserVal?.uid;
    this.authService.currentUser.userData.subscribe((user) => {
      this.currentUid = user?.uid;
    });
  }

  public create(data: Job) {
    data.user = this.authService.currentUserVal?.uid;
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
