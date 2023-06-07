import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';
import { FilterTeamPipe } from '../filter-team.pipe';


@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
  providers: [FilterTeamPipe] // Add FilterTeamPipe to providers
})


export class FixturesComponent implements OnInit {
  form!: FormGroup;
  teamList: { name: string }[] = [{ name: 'Team A' }, { name: 'Team B' }];
  dataSource: any[] = [];
  
  teams: any[] =[]; // Define the teams property as an array of any type
  selectedTeam: any; // Define the selectedTeam property as any type
  
  constructor(
    public dialog: MatDialog,
    private table: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.form = this.table.group({
      teamA: [''],
      teamB: [''],
      pipes: [FilterTeamPipe],
      winner: ['']
    });
    
    this.firebaseService.fetchTableData().subscribe(data => {
      this.teamList = data.map((team: any) => team.name);
      this.dataSource = Object.values(data);
    });
  }
  
  TableUpdate(): void {
    const teamA = this.form.value.teamA;
    const teamB = this.form.value.teamB;
    const teamAGoals = this.form.value.teamAGoals;
    const teamBGoals = this.form.value.teamBGoals;
    
    try {
      if (teamA && teamB) {
        this.firebaseService.updateTable(teamA, teamB, teamAGoals, teamBGoals);
      }
    } catch (err) {
      console.log(err);
    }
  }
  }

