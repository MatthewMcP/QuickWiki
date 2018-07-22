import { Component, OnInit } from '@angular/core';

import { WikiDataService } from '../services/wiki-data.service';
import { Person } from '../models/person';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = "";

  firstResult: Person

  placeOfBirth:string = ""
  dateOfBirth:string = ""
  height:string = ""
  spouse:string = ""

  constructor(private wikiDataService: WikiDataService) { }

  ngOnInit() {
  }

  searchTextChange() : void {
    this.changeSearchTextToTitleCase();
    this.wikiDataService.getCelebrityData(this.searchText).subscribe(result =>
      {
        console.log("result: "+result)

        this.placeOfBirth = result.results.bindings[0].birthLocationLabel.value;
        this.dateOfBirth = "blank"; //new Date(result.results.bindings[0].date_of_birth.value);
        this.height = result.results.bindings[0].height.value;
        this.spouse = result.results.bindings[0].spouseLabel.value;

        //this.firstResult = Person();
        //this.firstResult.Height = result.results.bindings[0].height.value;
      });
    }

    searchForSpouse() : void {
      this.searchText = this.spouse;
      this.searchTextChange();
    }

    changeSearchTextToTitleCase() : void{
      var tempSearchText = this.searchText.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      this.searchText = tempSearchText;
    }

  }
