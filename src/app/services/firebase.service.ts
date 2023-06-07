import { Injectable } from '@angular/core';
import { Database, ref,set, onValue } from '@angular/fire/database';
import { Observable, map } from 'rxjs';


export interface club {
  name: string;
  Win: number;
  Loss: number;
 
  totalpoints: number;
  totalmatch: number;
  totalgoals:number;


}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public ab: Database) { }



  fetchTableData(): Observable <club[]>  { 
    const databaseRef = ref (this.ab , 'clubName')

    return new Observable<club[]>((observer) => {
      onValue(
        databaseRef,
        (snapshot) => {
          const clubList: club[] = [];
          snapshot.forEach((childSnapshot) => {
            const club= childSnapshot.val();
            clubList.push(club);
          });
          observer.next(clubList);
        },
        (error) => observer.error(error)
      );
    }).pipe(map((clubList) => clubList.filter(Boolean)));
  }

   updateTable( clubA: club, clubB: club,clubAGoals:number, clubBGoals:number): void {
    console.log(clubA, clubB);
    
    clubA.totalmatch += 1;
clubB.totalmatch += 1;

if (clubAGoals > clubBGoals) {
  clubA.Win += 1;
  clubA.totalpoints += 2;
  clubB.Loss += 1;
} else if (clubAGoals < clubBGoals) {
  clubA.Win += 1;
  clubB.totalpoints += 2;
  clubA.Loss += 1;
} else {
 
  clubB.totalpoints += 1;
}

clubA.totalgoals += clubAGoals;
clubB.totalgoals += clubBGoals;
    
    // Update the data in the Realtime Database using the reference of each club
    const clubARef = ref(this.ab, `clubName/${clubA.name}`);
    const clubBRef = ref(this.ab, `clubName/${clubB.name}`);
    
    set(clubARef, { ...clubA });
    set(clubBRef, { ...clubB });
  }
    }
  

