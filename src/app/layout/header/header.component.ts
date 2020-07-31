import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
  }

  getFirstLetter() {
    return this.userInfoService.userName.split('')[0].toUpperCase()
  }

}
