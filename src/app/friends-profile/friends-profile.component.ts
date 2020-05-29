import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-friends-profile',
  templateUrl: './friends-profile.component.html',
  styleUrls: ['./friends-profile.component.css']
})
export class FriendsProfileComponent implements OnInit {
  email: string;
  posts;
  constructor(private userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.email = params.email;
    });

    this.userService.getFriendsProfile(this.email).subscribe(
      res => {

        this.posts = res;
      },
      err => {

      }
    );

  }

  follow(email) {
    this.userService.follow(this.email).subscribe(
      res => {
        console.log('Rezzzzzz', res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
