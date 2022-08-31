import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = 'https://localhost:44385/api/Client';
  constructor(private http: HttpClient) { }

  
  login(client: Client): Observable<Client>{
    return this.http.post(`${this.url}/log_in`, {
      "email": client.email,
      "password": client.password,
    });
  }

  signup(client: Client): Observable<Client>{
    return this.http.post(`${this.url}/sign_up`, {
      "email": client.email ?? "",
      "password": client.password ?? "",
      "firstName": client.firstName ?? "",
      "lastName": client.lastName ?? "",
      "age": client.age ?? 25,
      "yearsOfDrivingExp": client.exp ?? 1,
    });

  }

}
