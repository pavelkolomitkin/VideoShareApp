import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {select, Store} from '@ngrx/store';
import { State } from '../../reducers';
import { UserLoginStart } from '../../actions/security';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErrors: Observable<{}>;

  constructor(private store: Store<State>) {
    this.loginErrors = store.pipe(select(state => state.security.authErrors));
    // this.loginErrors.subscribe((errors) => {
    //   debugger;
    //   console.log(errors);
    // });
    // this.loginErrors = store.select((state) => {
    //   debugger;
    //   return state.security.authErrors;
    // });
  }

  ngOnInit() {

  }


    onSubmit(form: NgForm) {
      const { email, password } = form.value;
      console.log(email, password);

      this.store.dispatch(new UserLoginStart({
          login: email,
          password: password
      }));
    }
}
