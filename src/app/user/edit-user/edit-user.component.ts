import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  errorMsg?: String;
  displayError : boolean = false;
  is_idExist : boolean = false;

  constructor(
    public fb: FormBuilder,
    private router : Router,
    private route : ActivatedRoute,
    public userService : UserService
) {

  this.userForm = this.fb.group({
    _id: ['', Validators.required],
    usr_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    usr_fullname: ['', [Validators.required, Validators.pattern("^.* .*$")]],
    usr_address: ['', Validators.required],
  });

  this.userService.getUserById(this.route.params['value'].id).subscribe(data => {
    if(data) {
      delete data['__v']
      delete data['updated_at']
      this.userForm.setValue(data)
      this.is_idExist = true;
    }
  }, error => this.errorMsg = error )

}

  ngOnInit(): void {
    // this.userForm = this.fb.group({
    //   _id: ['', Validators.required],
    //   usr_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    //   usr_fullname: ['', Validators.required],
    //   usr_address: ['', Validators.required],
    // });

    // this.userService.getUserById(this.route.params['value'].id).subscribe(data => {
    //   if(data) {
    //     delete data['__v']
    //     delete data['updated_at']
    //     this.userForm.setValue(data)
    //     this.is_idExist = true;
    //   }
    // }, error => this.errorMsg = error )
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.displayError = true;
      return;
   }
    this.userService.updateUser(this.userForm.value._id, this.userForm.value).subscribe(res => {
      alert('Successfully Updated!')
      this.displayError = false;
      this.router.navigate(['/'])
    }, error => this.errorMsg = error )
  }

  get isIdExist() {
    return this.is_idExist;
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
