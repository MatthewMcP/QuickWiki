import { Component, OnInit } from '@angular/core';

import { WikiDataService } from '../services/wiki-data.service';
import { Human } from '../models/human';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = "";

  humanResults: Human[] = [];

  constructor(private wikiDataService: WikiDataService) { }

  ngOnInit() {
  }

  searchTextChange() : void {
    this.changeSearchTextToTitleCase();
    this.wikiDataService.getCelebrityData(this.searchText).subscribe(result =>
      {
        this.humanResults = result;
      });
    }

    searchForSpouse(spouseName: string) : void {
      this.searchText = spouseName;
      this.searchTextChange();
    }

    changeSearchTextToTitleCase() : void{
      var tempSearchText = this.searchText.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      this.searchText = tempSearchText.trim();
    }
  }
