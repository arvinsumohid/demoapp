import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions: {} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  baseUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  private handleError<T> ( operation = 'operation', result?: T ) {

  }

  addUser(user) : Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, JSON.stringify(user) , this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  getUserById(id) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }

  updateUser( id : String, user : User) : Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.http.delete<User>(`${this.baseUrl}/users/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
