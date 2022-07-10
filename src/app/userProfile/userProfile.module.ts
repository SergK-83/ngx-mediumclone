import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from 'src/app/userProfile/components/userProfile/userProfile.component';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileService} from 'src/app/userProfile/services/userProfile.service';
import {EffectsModule} from '@ngrx/effects';
import {GetUserProfileEffect} from 'src/app/userProfile/store/effects/getUserProfile.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from 'src/app/userProfile/store/reducers';

const routes: Routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers)
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService]
})
export class UserProfileModule {}
