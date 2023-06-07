import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTeam'
})
export class FilterTeamPipe implements PipeTransform {

  transform(data: any[], selectedTeam: any[]): any[] {
    if (!selectedTeam || selectedTeam.length === 0) {
      return data;
    }
  
    const filteredSelectedTeam = selectedTeam.filter(team => team.name !== selectedTeam[0].name);
    const store = data.filter(team => !filteredSelectedTeam.some(selected => selected.name === team.name));
  
    console.log(store);
    return store;
  }
  
}
