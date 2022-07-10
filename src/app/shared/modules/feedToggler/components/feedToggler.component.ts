import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {isLoggedInSelector} from 'src/app/auth/store/selectors';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html'
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  isLogged$: Observable<boolean | null>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initializedValues();
  }

  initializedValues(): void {
    this.isLogged$ = this.store.pipe(select(isLoggedInSelector));
  }
}
