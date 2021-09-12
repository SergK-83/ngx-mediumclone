import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from 'src/app/settings/components/settings/settings.component';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
