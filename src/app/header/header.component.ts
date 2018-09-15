import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {State} from '../reducers';
import {User} from '../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {UserLogout} from '../actions/security';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User = null;
  userSubscription: Subscription;

  constructor(private store: Store<State>) {

    this.userSubscription = store.pipe(select(state => state.security.user)).subscribe((user) => {
      this.user = user;
    });

  }



  ngOnInit() {
  }

    ngOnDestroy(): void {

      this.userSubscription.unsubscribe();
    }

    onLogoutClickHandler(event)
    {
      this.store.dispatch(new UserLogout());
    }

}
