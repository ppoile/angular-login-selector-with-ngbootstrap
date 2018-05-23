import { Component, OnInit } from '@angular/core';

import { Login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {
  logins: Login[];
  selectedLogin: Login;

  constructor(
    private loginService: LoginService) { }

  ngOnInit() {
    this.getLogins();
  }

  onSelect(login: Login): void {
    console.log(`onSelect(${login})`);
    this.selectedLogin = login;
  }

  getLogins(): void {
    this.loginService.getLogins().subscribe(logins => {
      console.log('got logins:');
      console.log(logins);
      this.logins = logins;
    });
  }
}
