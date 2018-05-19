import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login-selector',
  templateUrl: './login-selector.component.html',
  styleUrls: ['./login-selector.component.css']
})
export class LoginSelectorComponent implements OnInit {

  logins = [
    'Dover',
    'London',
    'London Kraftwerk',
  ];
  selectedLogins = { };
  selectionForPanel: string;
  showNoLoginsAsString = '';
  showAllLoginsAsString: string;
  showDefaultLoginsAsString: string;
  showLoginsAsString: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    console.log('constructor:');
    this.logins.sort();
    this.showAllLoginsAsString = this.logins.join(',');
    this.showDefaultLoginsAsString = this.showAllLoginsAsString;
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log('queryParams:');
      console.log(queryParams);
      this.parseQueryParams(queryParams);
    });
  }

  ngOnInit() {
    console.log('ngOnInit:');
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
      this.selectedLogins[login] = true;
    }
  }

  onAll() {
    console.log('onAll:');
    this.updateShowLogins(this.showAllLoginsAsString);
  }

  onNone() {
    console.log('onNone:');
    this.updateShowLogins(this.showNoLoginsAsString);
  }

  selectNone() {
    console.log('selectNone:');
    for (let login of this.logins) {
      this.selectedLogins[login] = false;
    }
  }

  onChange() {
    console.log('onChange:');
    console.log(this.selectedLogins);
    let selectedLogins = [];
    for (let login of this.logins) {
      if (this.selectedLogins[login]) {
        selectedLogins.push(login);
      }
    }
    let showLoginsAsString = selectedLogins.join(',');
    console.log(showLoginsAsString);
    this.updateShowLogins(showLoginsAsString)
  }

  updateShowLogins(showLoginsAsString: string)
  {
    console.log('updateShowLogins:');
    console.log(showLoginsAsString);
    this.showLoginsAsString = showLoginsAsString;
    let showLogins = showLoginsAsString;
    if (showLoginsAsString === this.showDefaultLoginsAsString) {
      showLogins = null;
    }
    let extras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { showLogins: showLogins },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['ttt'], extras);
  }

  evalSelection()
  {
    console.log('evalSelection:');
    let selection = this.showLoginsAsString;
    if (selection === this.showAllLoginsAsString) {
      selection = '(All)';
    }
    else if (selection === this.showNoLoginsAsString) {
      selection = '(None)';
    }
    this.selectionForPanel = selection;
    console.log(this.selectionForPanel);
  }
}
