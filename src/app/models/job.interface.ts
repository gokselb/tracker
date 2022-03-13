import firebase from 'firebase/app'; 

export interface Job {
  id: string;
  invoiceNo: number;
  type: string;
  jobName: string;
  customer: string;
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
  country: string;
  city: string;
  secretary: string;
  interpreters: string;
  total: number;
  remaining: number;
  payDate: firebase.firestore.Timestamp;
  currency: string;
  user: string;
}
