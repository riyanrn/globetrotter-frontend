import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private apiUrl = 'http://localhost:8000/globetrotter'; // Backend API URL

  constructor(private http: HttpClient) {}

  getRandomDestination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/random/question`);
  }

  checkCorrectAnswer(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/check/answer`, body)
  }

  // Shared service
  private saveUserInLocalStorage = new BehaviorSubject<string | null>(null);
  fetchUserName$ = this.saveUserInLocalStorage.asObservable();

  updateSelectedOption(option: any) {
    this.saveUserInLocalStorage.next(option);
  }
}
