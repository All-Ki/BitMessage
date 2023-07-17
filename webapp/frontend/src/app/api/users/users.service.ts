import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getCurrentUser() : number {
    return 1;
  }
  login(private_key: string) : boolean {
    console.log('login ' + private_key);
    return true;
  }
}
