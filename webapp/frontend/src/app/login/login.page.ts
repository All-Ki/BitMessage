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

  public private_key: string = "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";
  login(){
     this.userService.login(this.private_key)

  }

}
