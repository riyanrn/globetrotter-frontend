import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  message:any=''
  totalScore:any
  userName:any
  contactNumber:any
  appUrl:any
  whatsAppInviteUrl:any

  constructor() { }

  ngOnInit(): void {
    this.message = `🎉 I just played this awesome travel puzzle game! 🌍 I scored ${this.totalScore} ✅ Think you can beat my score? Try it now! 🔥 Play here: ${this.appUrl}`;
  }

  onSubmitInviteForm(){
    console.log(this.contactNumber,this.message);
    
    this.whatsAppInviteUrl =`https://wa.me/${this.contactNumber}?text=${encodeURIComponent(this.message)}`

  }
}
