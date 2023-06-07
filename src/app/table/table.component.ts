import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { FixturesComponent } from '../fixtures/fixtures.component';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  dataSource: [] | any;
  isActive = false;
  @ViewChild(MatSort)
  sort!: MatSort;
  sortedDataSource: any[] = [];

  columnsHeader = ['name', 'Win', 'Loss', 'totalpoints', 'totalmatch', 'totalgoals']
    ;
  constructor(
    private firebaseService: FirebaseService,
    public auth: AuthenticationService,
    public route: Router,
    private _dialog: MatDialog) {
    {
      this.firebaseService.fetchTableData().subscribe(data => {
        this.dataSource = Object.values(data);
        console.log(data)

      });
    }
  }

  ngOnInit() { };
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.sortByHighestPoints();
    }
  }
  private sortByHighestPoints(): void {
    this.sortedDataSource = this.dataSource.sort((clubA: { totalpoints: number; }, clubB: { totalpoints: number; }) => clubB.totalpoints - clubA.totalpoints);
    console.log(this.sortedDataSource)
  }




  PlayMatch() {
    this._dialog.open(FixturesComponent, {
      width: '350px'
    })

  }

}
