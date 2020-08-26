import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  errorMsg?: String;
  displayError : boolean = false;

  constructor(
    public fb: FormBuilder,
    private router : Router,
    public userService : UserService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      usr_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      usr_fullname: ['', [Validators.required, Validators.pattern("^.* .*$")]],
      usr_address: ['', [Validators.required]],
    })
  }

  submitForm() {
    if (this.userForm.invalid) {
      this.displayError = true;
      return;
   }
  
    this.userService.addUser(this.userForm.value).subscribe(res => {
      alert('User Created Successfully!')
      this.displayError = false;
      this.router.navigateByUrl('/')
    }, error => this.errorMsg = error)
  }

  get userEmail() {
    return this.userForm.get('usr_email')
  }

  get userFullName() {
    return this.userForm.get('usr_fullname')
  }

  get userAddress() {
    return this.userForm.get('usr_address')
  }
}
