import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfiles().subscribe(res => {
      this.users = res;
    });
  }

  getFriendsProfile(email) {
    this.router.navigate(['/profile', email]);
  }

}
