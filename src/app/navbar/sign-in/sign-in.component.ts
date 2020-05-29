import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/dataService/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/userService/user.service';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  showSideMenu = false;
  liveCicleLogo = '../assets/icons/liveciclelogo2.png';
  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  loggedIn: boolean;


  constructor(private mydata: DataService, private userService: UserService, private router: Router, private authService: AuthService) {
    this.mydata.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  ngOnInit() {
    this.mydata.currentShowSideMenu.subscribe(showSideMenu => this.showSideMenu = showSideMenu);
  }

  ngOnDestroy() {
  this.mydata.currentShowSideMenu.subscribe(showSideMenu => this.showSideMenu = showSideMenu).unsubscribe();
  }

  toogleSideMenu(): void {
    this.showSideMenu = !this.showSideMenu;
    this.mydata.editShowSideMenu(this.showSideMenu);
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(
      res => {
        this.router.navigateByUrl('/profile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  logout() {
    this.authService.removeTokens();
    this.router.navigate(['/login']);
  }
}
