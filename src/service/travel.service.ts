import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private apiUrl = environment.apiUrl // Backend API URL 

  constructor(private http: HttpClient) {}

  getRandomDestination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/random/question`);
  }

  checkCorrectAnswer(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/check/answer`, body)
  }

  // Create user in DB
  createUserWithScore(body:any){
    return this.http.post(`${this.apiUrl}/scoring/save/user/score`,body)
  }

  // Get single user details by user name 
  getOneUserName(userName:any){
    return this.http.get(`${this.apiUrl}/scoring/get/user/score?user_name=${userName}`)
  }

  // Shared service
  private saveUserInLocalStorage = new BehaviorSubject<string | null>(null);
  fetchUserName$ = this.saveUserInLocalStorage.asObservable();

  updateSelectedOption(option: any) {
    this.saveUserInLocalStorage.next(option);
  }

  // Get user details on click of send invite to get user details
  private getUserDetails = new BehaviorSubject<null>(null)
  fetchUserDetailsByName = this.getUserDetails.asObservable();

  getEventToCallUserDetailsAPI(event:any){
    this.getUserDetails.next(event)
  }
}
