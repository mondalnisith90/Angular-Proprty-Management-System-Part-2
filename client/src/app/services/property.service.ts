import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseurl: string = `http://localhost:8002/property`;

  constructor(private httpClient: HttpClient) { }

  public getAllProperty(): Observable<any> {
    const serverUrl = `${this.baseurl}/all`;
    return this.httpClient.get(serverUrl).pipe(
      catchError(this.handelError)
    );
  }

  public addProperty(propertyDetails: any): Observable<any> {
    const serverUrl = `${this.baseurl}/add`;
    return this.httpClient.post(serverUrl, propertyDetails).pipe(
      catchError(this.handelError)
    );
  }

  public deleteProperty(propertyId: string): Observable<any> {
    const serverUrl = `${this.baseurl}/remove/${propertyId}`;
    return this.httpClient.delete(serverUrl).pipe(
      catchError(this.handelError)
    );
  }

  private handelError(error: HttpErrorResponse){
    return throwError(error.error);
  }
}
