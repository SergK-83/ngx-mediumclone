import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddToFavoritesComponent} from 'src/app/shared/modules/addToFavorites/components/addToFavorites/addToFavorites.component';
import {AddToFavoritesService} from 'src/app/shared/modules/addToFavorites/services/addToFavorites.service';
import {EffectsModule} from '@ngrx/effects';
import {AddToFavoriteEffect} from 'src/app/shared/modules/addToFavorites/store/effects/addToFavorite.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoriteEffect])],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService]
})
export class AddToFavoritesModule {}
