import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/api/auth';
  public isEnter : boolean = false;
  constructor(private http: HttpClient) { }
  signIn(email: string, password: string): Observable<{
    token: string;
    userId: number;
    role: string;
  }> {
    return this.http.post<{
      token: string;
      userId: number;
      role: string;
    }>(`${this.url}/login`, { email, password });
  }

  signUp(name: string, email: string, password: string, role: string): Observable<{
    message: string;
    userId: number;
    token: string;
  }> {
    return this.http.post<{
      message: string;
      userId: number;
      token: string;
    }>(`${this.url}/register`, { name, email, password, role });
  }
}
