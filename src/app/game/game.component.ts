import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/service/travel.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  clues: any[] = [];
  funFact: string = '';
  trivia: string = '';
  userGuess: string = '';
  destination: string = '';
  isCorrect: boolean | null = null;
  selectedOption: string = '';
  isUserOnBorded:boolean = false
  hideSubmitButton:boolean = false
  enableNextButton:boolean = false
  enableScore:boolean = false
  userName:any = '';
  options:any[]=[]
  correctCount:any = 0
  inCorrectCount:any = 0
  gameScore:any = {}

  constructor(private travelService: TravelService) {}

  ngOnInit() {
    this.getNewDestination();
    this.fetchScoreFromLocaStoreage()
    let userName = localStorage.getItem('userName')
    if(userName){
      this.isUserOnBorded = true
    }
  }

  rand_index: any = null;
  getNewDestination() {
    this.travelService.getRandomDestination().subscribe((res: any) => {
      let data = res?.result
      this.rand_index = res?.rand_index
      this.destination = data.city;
      this.clues = data?.clues;
      this.funFact = data.fun_fact;
      this.trivia = data.trivia;
      this.options = data?.options
      this.isCorrect = null; // Reset for new question
      this.hideSubmitButton = false
      this.enableNextButton = false
    });
  }

  checkGuess() {
    this.userGuess = this.selectedOption
    this.travelService.checkCorrectAnswer({ rand_index: this.rand_index, selected_answer: this.userGuess }).subscribe({
      next: (res: any) => {
        this.isCorrect = res?.is_correct

        if(this.isCorrect) {
          this.correctCount += 1
          localStorage.setItem('correct', this.correctCount)
        } else {
          this.inCorrectCount += 1;
          localStorage.setItem('inCorrect', this.inCorrectCount)
        }

        this.hideSubmitButton = true
        this.enableNextButton = true
        this.enableScore = true
        
        this.fetchScoreFromLocaStoreage()
      }
      
    })
    
  }

  // fetch the score of the use
  fetchScoreFromLocaStoreage(){
    this.gameScore = {
      correct: localStorage.getItem('correct'),
      inCorrect: localStorage.getItem('inCorrect')
    }
    console.log(this.gameScore);
  }

  onSubmitUserName(){
    console.log(this.userName);
    localStorage.setItem('userName',this.userName)
    this.isUserOnBorded = true
    this.travelService.updateSelectedOption({isUserSaved:true})
  }

  closeGame:boolean= false
  totalScore:any
  finishGame(){
    this.closeGame = true
    this.totalScore = Number(this.gameScore?.correct) + Number(this.gameScore?.inCorrect)
  }

  restartGame(){
    localStorage.clear()
    window.location.reload()
  }


}
