import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Login } from './login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginsUrl = 'api/logins';

  constructor(
    private http: HttpClient) { }

  getLogins(): Observable<Login[]> {
    return this.http.get<Login[]>(this.loginsUrl).pipe(
      tap(logins => console.log(`fetched ${logins.length} logins`)),
      catchError(this.handleError('getLogins', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
