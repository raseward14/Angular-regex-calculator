import { Routes } from '@angular/router';

import { RegexComponent } from './regex/regex.component';
import { StringsComponent } from './strings/strings.component';

export const routes: Routes = [
  {
    path: '',
    component: RegexComponent,
  },
  {
    path: 'strings',
    component: StringsComponent,
  },
];
