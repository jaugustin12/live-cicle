import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  liveCicleLogo: string;
  showSideMenu = false;
  showNav = true;

  constructor(private mydata: DataService) {
    this.liveCicleLogo = '../assets/images/liveciclelogo.png';
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
  toggleNav() {
    this.showNav = !this.showNav;
  }
}
