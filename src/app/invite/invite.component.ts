import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TravelService } from 'src/service/travel.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  angularAppUrl = environment.angularAppUrl

  message:any=''
  totalScore:any
  userName:any
  contactNumber:any
  appUrl:any
  whatsAppInviteUrl:any

  constructor(private travelService: TravelService) { 
    travelService.fetchUserDetailsByName.subscribe({
      next:(res:any) => {
        if(res && res?.getUserDetails){
          this.getUserDetailsByName()
        }
      }
    })
  }

  ngOnInit(): void {
    
  }

  // On inviting friend save that user in db as well
  onSubmitInviteForm(){
    // Whatsapp invite link
    this.whatsAppInviteUrl =`https://wa.me/${this.contactNumber}?text=${encodeURIComponent(this.message)}`

    window.open(this.whatsAppInviteUrl,"_blank")
    this.saveInvitedUser()
    localStorage.clear()
  }

  // Saving the invited user
  saveInvitedUser(){
    let user = {
      userName: this.userName
    }
    this.travelService.createUserWithScore(user).subscribe({
      next: (res:any) => 
      {
        //TODO: action after successful user save
      },
      error:(error) =>{

      }
    })
  } 

  //Get user detials by user name
  userDetails:any
  getUserDetailsByName(){
    let user = localStorage.getItem('userName')
    this.travelService.getOneUserName(user).subscribe({
      next:(res:any) => {
        this.userDetails = {
          correct_answer:res?.result?.correct_answer,
          total_questions: Number(res?.result?.correct_answer) + Number(res?.result?.incorrect_answer)
        }
        this.message = `🎉 I just played this awesome travel puzzle game! 🌍 I scored ${this.userDetails?.correct_answer} / ${this.userDetails?.total_questions} ✅ Think you can beat my score? Try it now! 🔥 Play here: ${this.angularAppUrl}?user=${this.userName}`;
      },
      error: (error) => {

      }
    })
  }
}
