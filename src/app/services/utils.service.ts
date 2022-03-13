import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  public convertToTimestamp(date: Date): firebase.firestore.Timestamp | undefined {
    return date ? firebase.firestore.Timestamp.fromDate(date) : undefined;
  }
}
