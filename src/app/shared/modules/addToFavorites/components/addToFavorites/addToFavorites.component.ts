import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {addToFavoritesAction} from 'src/app/shared/modules/addToFavorites/store/actions/addToFavorites.action';
import {Observable} from 'rxjs';
import {isLoggedInSelector} from 'src/app/auth/store/selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html'
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('articleSlug') articleSlugProps: string;
  @Input('favoritesCount') favoritesCountProps: number;

  favoritesCount: number;
  isFavorited: boolean;
  isLogged: boolean | null;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.store.pipe(select(isLoggedInSelector)).subscribe(
      (val) => {
        this.isLogged = val;
      }
    );
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  handleLike(): void {
    if (!this.isLogged) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.articleSlugProps
      })
    );

    this.favoritesCount = this.isFavorited ? this.favoritesCount - 1 : this.favoritesCount + 1;
    this.isFavorited = !this.isFavorited;
  }
}
