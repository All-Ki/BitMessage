import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../api/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {

  }

  public private_key: string = "";
  login(){
    this.userService.login(this.private_key)
  }

}
