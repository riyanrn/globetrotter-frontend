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

  constructor(private travelService: TravelService) { }

  ngOnInit(): void {
    this.message = `🎉 I just played this awesome travel puzzle game! 🌍 I scored ${this.totalScore} ✅ Think you can beat my score? Try it now! 🔥 Play here: ${this.angularAppUrl}?user=${this.userName}`;
  }

  // On inviting friend save that user in db as well
  onSubmitInviteForm(){
    this.message = `🎉 I just played this awesome travel puzzle game! 🌍 I scored ${this.totalScore} ✅ Think you can beat my score? Try it now! 🔥 Play here: ${this.angularAppUrl}?user=${this.userName}`;

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
}
