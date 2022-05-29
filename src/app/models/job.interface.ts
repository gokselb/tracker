import firebase from 'firebase/app'; 

export interface Job {
  id: string;
  invoiceNo: number;
  type: string;
  assignment: string;
  company: string;
  client: string;
  startDate?: firebase.firestore.Timestamp;
  endDate?: firebase.firestore.Timestamp;
  place: string;
  interpreters: string;
  amount: number;
  payDate?: firebase.firestore.Timestamp;
  currency: string;
  user?: string;
  isPaid?: boolean;
}
