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

  login(form: any){
    this.userService.login
  }
}
