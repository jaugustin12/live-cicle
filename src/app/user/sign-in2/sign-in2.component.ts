import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';

import { UserService } from '../../../services/userService/user.service';

@Component({
  selector: 'app-sign-in2',
  templateUrl: './sign-in2.component.html',
  styleUrls: ['./sign-in2.component.css']
})
export class SignIn2Component implements OnInit {
  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
    onSubmit(form: NgForm) {
      this.authService.login(form.value).subscribe(
        res => {
          this.router.navigateByUrl('/profile');
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          } else {
            this.serverErrorMessages = 'Something went wrong';
          }
        }
      );
    }
  }


