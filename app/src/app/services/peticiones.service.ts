import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  private SERVER_URL = 'http://localhost/prueba/server/';

  constructor(private httpClient: HttpClient) { }

  public getData(): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/getData.php`);
  }

  public editData (element): Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/editData.php`,{element:element});
  }

  public pushData (element): Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/pushData.php`,{element:element});
  }

  public deleteData(motivo): Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/deleteData.php`,{motivo:motivo});
  }

  public orderData(asc): Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/orderData.php`,{asc:asc});
  }
}