import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { InviteComponent } from './invite/invite.component';

const routes: Routes = [
  {
    path:'',
    component: GameComponent
  },
  {
    path:"invite",
    component: InviteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
