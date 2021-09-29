import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = "https://localhost:44321/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiURL + '/Employee')
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiURL + '/Employee', JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiURL + '/Employee/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiURL + '/Employee/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.httpClient.delete<Employee>(this.apiURL + '/Employee/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
