import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    params: null
  };
  constructor(private http: HttpClient) { }
  
  getVisitors(sortColumns: string[], isAscending: boolean, startInd: Number, pageSize: Number, searchString: string): Observable<any> {
    let params = new HttpParams();
    //sortColumns.length > 0 ? params.append('sortColumns', sortColumns) : this.httpOptions.sortColumns = ["first_name"];
    if(sortColumns.length > 0){
      sortColumns.forEach(column => {
        params = params.append('sortColumns[]', column);
      });
    } else {
      params = params.append('sortColumns[]', 'last_name');
    };
    params = params.append('isAscending', isAscending ? "true" : "false");
    params = params.append('startInd', ""+startInd);
    params = params.append('pageSize', ""+pageSize);
    params = params.append('searchString', searchString);
    this.httpOptions.params = params;
    return this.http.get(apiUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getVisitorsCount(searchString : string): Observable<any> {
    let params = new HttpParams().set('count', "true");
    params = params.append('searchString' , searchString);
    this.httpOptions.params = params;
    return this.http.get(apiUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getVisitor(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  addVisitor(data): Observable<any> {
    console.log("In add Visitor", data);
    return this.http.post(apiUrl, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateVisitor(data): Observable<any> {
    return this.http.put(apiUrl, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteVisitor(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
