import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"; 
import { UserService } from "../../shared/user.service"; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  model = { 
    fullName: '',
    password: ''
  };

  serverErrorMessages: string;
  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        localStorage.setItem('ID',res.user._id); //save id in local storage.
        this.router.navigateByUrl('/companies');
      },
      err => { 
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
