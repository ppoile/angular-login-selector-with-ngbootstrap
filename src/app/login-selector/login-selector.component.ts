import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';

import { Login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-selector',
  templateUrl: './login-selector.component.html',
  styleUrls: ['./login-selector.component.css']
})
export class LoginSelectorComponent implements OnInit {
  logins: Login[] = [];
  selectedLogins = { };
  selectionForPanel: string;
  showNoLoginsAsString = '';
  showAllLoginsAsString: string;
  showDefaultLoginsAsString: string;
  showLoginsAsString: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) {
    console.log('constructor:');
    this.updateLoginsAndHelpers(this.logins);
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log('queryParams:');
      console.log(queryParams);
      this.parseQueryParams(queryParams);
    });
  }

  ngOnInit() {
    console.log('ngOnInit:');
    this.getLogins();
  }

  parseQueryParams(params: ParamMap) {
    console.log('parseQueryParams:');
    let showLoginsAsString = params.get('showLogins');
    console.log(showLoginsAsString);
    if (showLoginsAsString === null) {
      showLoginsAsString = this.showDefaultLoginsAsString;
    }
    else if (showLoginsAsString === 'All') {
      showLoginsAsString = this.showAllLoginsAsString;
    }
    this.showLoginsAsString = showLoginsAsString;
    console.log(showLoginsAsString);
    this.evalSelection();
    this.selectNone();
    for (let login of showLoginsAsString.split(',')) {
      if (login === '')
        continue;
      console.log(`select '${login}'`);
      this.selectedLogins[login] = true;
    }
  }

  onAll() {
    console.log('onAll:');
    console.log(this.showAllLoginsAsString)
    this.updateShowLogins(this.showAllLoginsAsString);
    this.evalSelection();
  }

  onNone() {
    console.log('onNone:');
    this.updateShowLogins(this.showNoLoginsAsString);
    this.evalSelection();
  }

  selectNone() {
    console.log('select none');
    for (let login of this.logins) {
      this.selectedLogins[login.name] = false;
    }
  }

  onChange() {
    console.log('onChange:');
    console.log(this.selectedLogins);
    let showLoginsAsString = this.getSelectedLogins().join(',');
    console.log(showLoginsAsString);
    this.updateShowLogins(showLoginsAsString)
    this.evalSelection();
  }

  private updateShowLogins(showLoginsAsString: string)
  {
    console.log('updateShowLogins:');
    console.log(showLoginsAsString);
    this.showLoginsAsString = showLoginsAsString;
    let showLogins = showLoginsAsString;
    if (showLoginsAsString === this.showDefaultLoginsAsString) {
      showLogins = null;
    }
    console.log(showLogins);
    let extras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { showLogins: showLogins },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], extras);
  }

  private evalSelection()
  {
    console.log('evalSelection:');
    let selection = this.showLoginsAsString;
    if (selection === this.showAllLoginsAsString) {
      selection = '(All)';
    }
    else if (selection === this.showNoLoginsAsString) {
      selection = '(None)';
    }
    else {
      selection = this.getShortestLoginSelection();
    }
    this.selectionForPanel = selection;
    console.log(`selectionForPanel: '${this.selectionForPanel}'`);

  }

  private getShortestLoginSelection() {
    const numAll = this.logins.length;
    const numSelected = this.showLoginsAsString.split(',').length;
    const numDeselected = numAll - numSelected;
    if (numDeselected < numSelected) {
      return '<strike>' + this.getDeselectedLogins().join(',') + '</strike>';
    }
    else {
      return this.showLoginsAsString;
    }
  }

  private getSelectedLogins() {
    let selectedLogins = [];
    for (let login of this.logins) {
      if (this.selectedLogins[login.name]) {
        selectedLogins.push(login.name);
      }
    }
    return selectedLogins;
  }

  private getDeselectedLogins() {
    let deselectedLogins = [];
    for (let login of this.logins) {
      if (!this.selectedLogins[login.name]) {
        deselectedLogins.push(login.name);
      }
    }
    return deselectedLogins;
  }

  private getLogins(): void {
    this.loginService.getLogins().subscribe(logins => {
      console.log(`got ${logins.length} logins`);
      this.updateLoginsAndHelpers(logins);
      let params = this.activatedRoute.snapshot.queryParamMap;
      console.log(params);
      this.parseQueryParams(params);
    });
  }

  private updateLoginsAndHelpers(logins: Login[]) {
    console.log('updateLoginsAndHelpers:');
    console.log(logins);
    this.logins = logins;
    this.showAllLoginsAsString = this.getAllLoginNames().join(',');
    this.showDefaultLoginsAsString = this.showAllLoginsAsString;
    console.log(`showAllLoginsAsString='${this.showAllLoginsAsString}'`);
    console.log(`showDefaultLoginsAsString='${this.showDefaultLoginsAsString}'`);
  }

  private getAllLoginNames() {
    let loginNames = [];
    for (let login of this.logins) {
      loginNames.push(login.name);
    }
    return loginNames;
  }
}
