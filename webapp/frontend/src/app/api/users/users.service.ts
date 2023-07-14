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
    return true;
  }
}
