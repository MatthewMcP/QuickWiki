import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Accept': 'application/sparql-results+json' })
};

@Injectable({
  providedIn: 'root'
})
export class WikiDataService {
  private wikiDataQueryUrl: string = "https://query.wikidata.org/sparql"
  private myQuery = "SELECT DISTINCT ?item ?birthLocation ?birthLocationLabel ?date_of_birth ?height WHERE {\n" +
        "  ?item ((wdt:P31|wdt:P101|wdt:P106)/wdt:P279*) wd:Q33999.\n" +
        "  ?item rdfs:label \"Ryan Reynolds\"@en.\n" +
        "  ?item wdt:P19 ?birthLocation.\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". }\n" +
        "  OPTIONAL { ?item wdt:P569 ?date_of_birth. }\n" +
        "  OPTIONAL { ?item wdt:P2048 ?height. }\n" +
        "}";

  constructor(private httpClient: HttpClient) { }

  getCelebrityData( searchTerm: string): Observable<any> {
    console.log("getCelebrityData: " + searchTerm);

    return this.httpClient.get(this.wikiDataQueryUrl,
    {
      params:{
        query : this.myQuery
      }
    }) // 1
     .pipe(map(data =>
       {
         debugger;
         console.log(data);
         return data;
       }),
       catchError(this.handleServerError)
     );
   }
/*
    return this.httpClient.get<any>("https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fdate_of_birth%20%3Fspouse%20%3FspouseLabel%20%3Fplace_of_birth%20%3Fplace_of_birthLabel%20%3Fheight%20WHERE%20%7B%0A%20%20%3Fhuman%20rdfs%3Alabel%20%22"
     +searchTerm +"%22%40en.%0A%20%20%3Fhuman%20wdt%3AP31%20wd%3AQ5.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fhuman%20wdt%3AP26%20%3Fspouse.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fhuman%20wdt%3AP569%20%3Fdate_of_birth.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fhuman%20wdt%3AP19%20%3Fplace_of_birth.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fhuman%20wdt%3AP2048%20%3Fheight.%20%7D%0A%7D")
    .pipe(map(data =>
      {
        console.log(data);
        return data;
      }),
       catchError(this.handleServerError);*/


  private handleServerError(error:any)
  {
    console.log(error.error || error.json || error);
    return Observable.throw(error.error || error.json || error);
  }
}



/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



/*
const httpOptions = {
  headers: new HttpHeaders({
      'Accept': 'application/sparql-results+json'})
};
'Content-type': 'application/x-www-form-urlencoded',

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/
/*
@Injectable({
  providedIn: 'root'
})
export class WikiDataService {
  private wikiDataQueryUrl: string = "https://query.wikidata.org/sparql"
  private myQuery: string  = "SELECT DISTINCT ?item ?birthLocation ?birthLocationLabel ?date_of_birth ?height ?spouse ?spouseLabel ?occupation ?occupationLabel WHERE {\n" +
        "  ?item ((wdt:P31|wdt:P101|wdt:P106)/wdt:P279*) wd:Q33999.\n" +
        "  ?item rdfs:label \";Ryan Reynolds\"@en.\n" +
        "  ?item wdt:P19 ?birthLocation.\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". }\n" +
        "  OPTIONAL { ?item wdt:P569 ?date_of_birth. }\n" +
        "  OPTIONAL {  }\n" +
        "  OPTIONAL { ?item wdt:P2048 ?height. }\n" +
        "  OPTIONAL { ?item wdt:P26 ?spouse. }\n" +
        "  OPTIONAL { ?item wdt:P106 ?occupation. }\n" +
        "}";

  constructor(private http: httpClient) { }

  getCelebrityData(searchTerm: string): Observable<any> {
    console.log("getCelebrityData: " + searchTerm);


return this.http.get('http://dbpedia.org/sparql', ,
{
  params:{
    query : 'SELECT * WHERE { <http://dbpedia.org/resource/Awolnation> ?pref ?obj } LIMIT 10'
  }
}) // 1
 .pipe(map(data =>
   {
     debugger;
     console.log(data);
     return data;
   }),
   catchError(this.handleServerError)
 );
}*/

/*


    return this.httpClient.get(this.wikiDataQueryUrl,
    {
      params: {
        query: this.myQuery,
        format: 'json'
      }
    })
    .pipe(map(data =>
      {
        debugger;
        console.log(data);
        return data;
      }),
      catchError(this.handleServerError)
    );
  }*/

/*  private handleServerError(error:any)
  {
    console.log(error.error || error.json || error);
    return Observable.throw(error.error || error.json || error);
  }
}
*/
