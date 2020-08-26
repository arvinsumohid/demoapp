import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path: '', component: ListUserComponent },
  {path: 'users', component: ListUserComponent},
  {path: 'user', component: AddUserComponent},
  {path: 'user/:id', component: EditUserComponent },
  {path: '404', component: NotfoundComponent},
 {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
