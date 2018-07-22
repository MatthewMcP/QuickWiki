import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Human } from '../models/human';

const httpOptions = {
  headers: new HttpHeaders({ 'Accept': 'application/sparql-results+json' })
};

@Injectable({
  providedIn: 'root'
})
export class WikiDataService {
  private wikiDataQueryUrl: string = "https://query.wikidata.org/sparql"

  constructor(private httpClient: HttpClient) { }

  getCelebrityData( searchTerm: string): Observable<Human[]> {
    console.log("getCelebrityData: " + searchTerm);

    var myQuery = "SELECT DISTINCT ?item ?birthLocation ?birthLocationLabel ?date_of_birth ?height ?spouse ?spouseLabel ?itemLabel WHERE {\n" +
        "  ?item rdfs:label \""+ searchTerm +"\"@en.\n" +
        "  ?item wdt:P19 ?birthLocation.\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". }\n" +
        "  OPTIONAL { ?item wdt:P569 ?date_of_birth. }\n" +
        "  OPTIONAL { ?item wdt:P2048 ?height. }\n" +
        "  OPTIONAL { ?item wdt:P26 ?spouse. }\n" +
        "  ?item wdt:P31 wd:Q5.\n" +
        "}\n" +
        "  ORDER BY ASC(?date_of_birth)";

    return this.httpClient.get(this.wikiDataQueryUrl,
    {
      params:{
        query : myQuery
      }
    })
     .pipe(map(data =>
       {
         var humans : Human[] = [];
         var jsonData =JSON.parse(JSON.stringify(data));
         for (let humanJson of jsonData.results.bindings) {
            humans.push(new Human(humanJson && humanJson.birthLocationLabel && humanJson.birthLocationLabel.value || "No Birth Location Info.",
                                  humanJson && humanJson.date_of_birth && humanJson.date_of_birth.value || "",
                                  humanJson && humanJson.height && humanJson.height.value || "",
                                  humanJson && humanJson.spouse && humanJson.spouse.value || "",
                                  humanJson && humanJson.spouseLabel && humanJson.spouseLabel.value || "No Spouse Info.",
                                  humanJson && humanJson.itemLabel && humanJson.itemLabel.value || "No Title Info.",
                                  ));
        }

         return humans;
       }),
       catchError(this.handleServerError)
     );
   }

  private handleServerError(error:any)
  {
    console.log(error.error || error.json || error);
    return Observable.throw(error.error || error.json || error);
  }
}
