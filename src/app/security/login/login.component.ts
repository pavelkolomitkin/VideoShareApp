import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import { State } from '../../reducers';
import {UserLoginStart} from '../../actions/security';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<State>) { }

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
