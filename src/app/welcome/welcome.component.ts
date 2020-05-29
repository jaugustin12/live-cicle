import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'LiveCicle';
  liveCicleLogo: string;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';


  constructor() {
    this.liveCicleLogo = '../../assets/images/liveciclelogo.png';
  }

  ngOnInit() {
    if (localStorage.getItem(this.JWT_TOKEN)) {
      localStorage.removeItem(this.JWT_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
    }
  }
}
