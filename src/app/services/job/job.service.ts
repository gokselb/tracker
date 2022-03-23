import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job, SignUp, User } from '@tts/models';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AuthenticationService } from '../authentication';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private currentUid?: string;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private get collection() {
    return this.db.collection<Job>('jobs', (ref) => {
      console.log('userId', this.currentUid);
      return ref.where('user', '==', this.currentUid ?? 1);
    });
  }
  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.currentUid = this.authService.currentUserVal?.uid;
    this.authService.currentUser.userData.subscribe((user) => {
      this.currentUid = user?.uid;
      if (!this.currentUid) {
        this.destroyed$.next(true);
      }
      console.log('userId', this.currentUid);
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
        }),
        takeUntil(this.destroyed$)
      );
  }

  public getAll() {
    console.log('fetching all');
    return this.collection.valueChanges({ idField: 'id' }).pipe(
      map((val) => {
        console.log('fetching all');
        return val;
      }),
      takeUntil(this.destroyed$)
    );
  }
}
