import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userInfoService: UserInfoService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getFirstLetter() {
    return this.userInfoService.userName.split('')[0].toUpperCase()
  }

  goToSettings() {
    return this.router.navigate(['/app/settings']);
  }

}
