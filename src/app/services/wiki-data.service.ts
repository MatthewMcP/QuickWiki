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
    //console.log("getCelebrityData: " + searchTerm);
    var myQuery = "SELECT DISTINCT ?item ?itemLabel ?itemDescription ?residence ?residenceLabel ?educated_at ?educated_atLabel ?birthLocation ?birthLocationLabel ?date_of_birth ?height ?spouse ?spouseLabel ?IMDb_ID ?sex_or_gender ?sex_or_genderLabel ?country_of_citizenship ?country_of_citizenshipLabel ?image ?title WHERE {\n" +
        "  ?item rdfs:label \""+ searchTerm +"\"@en.\n" +
        "  ?item wdt:P19 ?birthLocation.\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". }\n" +
        "  OPTIONAL { ?item wdt:P569 ?date_of_birth. }\n" +
        "  OPTIONAL { ?item wdt:P2048 ?height. }\n" +
        "  OPTIONAL { ?item wdt:P26 ?spouse. }\n" +
        "  OPTIONAL { ?item wdt:P345 ?IMDb_ID. }\n" +
        "  OPTIONAL { ?item wdt:P21 ?sex_or_gender. }\n" +
        "  OPTIONAL { ?item wdt:P27 ?country_of_citizenship. }\n" +
        "  OPTIONAL { ?item wdt:P18 ?image. }\n" +
        "  OPTIONAL { ?item wdt:P1476 ?title. }\n" +
        "  OPTIONAL { ?item wdt:P551 ?residence. }\n" +
        "  OPTIONAL { ?item wdt:P69 ?educated_at. }\n" +
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
            humans.push(new Human(
                                  humanJson && humanJson.item && humanJson.item.value || "No item.",
                                  humanJson && humanJson.birthLocationLabel && humanJson.birthLocationLabel.value || "No Birth Location Info.",
                                  humanJson && humanJson.country_of_citizenship && humanJson.country_of_citizenship.value || "",
                                  humanJson && humanJson.country_of_citizenshipLabel && humanJson.country_of_citizenshipLabel.value || "",
                                  humanJson && humanJson.date_of_birth && humanJson.date_of_birth.value || "",
                                  humanJson && humanJson.itemDescription && humanJson.itemDescription.value || "Not Found",
                                  humanJson && humanJson.height && humanJson.height.value || "Not Found",
                                  humanJson && humanJson.image && humanJson.image.value || "",
                                  humanJson && humanJson.IMDb_ID && humanJson.IMDb_ID.value || "",
                                  humanJson && humanJson.sex_or_genderLabel && humanJson.sex_or_genderLabel.value || "",
                                  humanJson && humanJson.spouse && humanJson.spouse.value || "",
                                  humanJson && humanJson.spouseLabel && humanJson.spouseLabel.value || "No Spouse Info.",
                                  humanJson && humanJson.itemLabel && humanJson.itemLabel.value || "No Title Info.",
                                  humanJson && humanJson.educated_at && humanJson.educated_at.value || "",
                                  humanJson && humanJson.educated_atLabel && humanJson.educated_atLabel.value || "Not Education Information.",
                                  humanJson && humanJson.residence && humanJson.residence.value || "",
                                  humanJson && humanJson.residenceLabel && humanJson.residenceLabel.value || "No Residence Information.",
                                  ));
        }

         var humanSet = Array.from(new Set(humans ));
         return humanSet;
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
