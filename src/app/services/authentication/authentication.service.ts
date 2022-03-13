import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Login, SignUp, User } from '@tts/models';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/app';
import { UserService } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser: {
    userData: Observable<firebase.User | null>;
    otherData?:  Subject<User>;
  };
  public currentUserVal!: firebase.User | null;
  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.currentUser = { userData: fireAuth.authState, otherData: new Subject() };
    this.currentUser.userData.subscribe((result) => {
      this.currentUserVal = result;
      this.userService.get(result?.uid).subscribe((result) => {
        this.currentUser.otherData?.next(result);
      });
    });
  }
  public signUp(data: SignUp) {
    return this.fireAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        return this.userService.create({
          id: result.user?.uid,
          name: data.name,
        });
      });
  }

  public login(data: Login) {
    return this.fireAuth.signInWithEmailAndPassword(data.email, data.password);
  }

  public logout() {
    return this.fireAuth.signOut();
  }
}
