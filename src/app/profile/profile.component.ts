import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user-model/user.model';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  liveCicleLogo: string;
  userDetails;
  public now: Date = new Date();
  time;
  email: string;
  posts;

    /* cardSwipe */
    index;
    config: SwiperConfigInterface = {
    effect: 'slide',
    a11y: true,
    direction: 'vertical',
    slidesPerView: 3,
    slideToClickedSlide: true,
    mousewheel: true,
    scrollbar: true,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 100,
    slidesOffsetAfter: 100,
    spaceBetween: 50,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1
        }
    }
  };

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.liveCicleLogo = '../assets/images/liveciclelogo.png';
   }

  ngOnInit() {
    const getUserProfiles = async () => {
      const UserProfiles = () => {
        return new Promise((resolve, reject) => {
          this.userService.getUserProfile().subscribe(
            res => {
              this.userDetails = res['user'];
              resolve();
            },
            err => {
              reject();
            }
          );
        });
      };
      const getPosts = () => {
        return new Promise((resolve, reject) => {
          this.userService.getPosts(this.userDetails.email).subscribe(
            (res) => {
              this.posts = res;
              resolve();
            },
            err => {
              reject();
            }
          );
        });
      };
      const a = await UserProfiles();
      const b = await getPosts();
    };
    return getUserProfiles();
  }

  dateTest() {
    if (this.now.getHours() >= 20 || this.now.getHours() <= 8) {
      this.time = 'night';
    } else {
      this.time = 'day';
    }
  }

  logout() {
    this.authService.removeTokens();
    this.router.navigate(['/login']);
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
