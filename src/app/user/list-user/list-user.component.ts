import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[];
  errorMsg?: String;

  constructor( 
    public userService: UserService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => this.users = data,
                                          error => this.errorMsg = error)
  }

  onEdit(id : string): void {
      window.localStorage.removeItem("editUserId")
      window.localStorage.setItem("editUserId", id.toString())
      this.router.navigate(['user', id.toString()])
  } 

  onDelete(id : string): void {
    this.userService.delete(id).subscribe(success => {
      this.userService.getUsers().subscribe(data => this.users = data,
                                    error => this.errorMsg = error)
    }, error => this.errorMsg = error)
  }

   

  onAdd(): void {
    this.router.navigate(['user'])
  }

}
