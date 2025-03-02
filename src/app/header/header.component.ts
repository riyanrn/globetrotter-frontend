import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from 'src/service/travel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName:any = ''
  isEnableUserName:boolean = false

  constructor(private travelService: TravelService,
    private router: Router
  ) { 
    travelService.fetchUserName$.subscribe((res:any)=>{
      if(res && res?.isUserSaved){
        this.getUserName()
        this.isEnableUserName = true
      }
    })
  }

  ngOnInit(): void {
    let userName = localStorage.getItem('userName')
    if(userName?.length){
      this.getUserName()
      this.isEnableUserName = true
    }
  }

  getUserName(){
    this.userName = localStorage.getItem('userName')
  }

  switchUser(){
    localStorage.clear()
    window.location.reload()
    window.open('/','_self')
  }

  inviteUser(){
    this.router.navigate(['/invite'])
    this.travelService.getEventToCallUserDetailsAPI({getUserDetails:true})
  }

  onClickRedirectToHome(){
    this.router.navigate(['/'])
  }

}
