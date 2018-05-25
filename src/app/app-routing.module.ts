import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PersonComponent } from './person/person.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // NOTE: these routes are to simulate an oauth login redirect for purposes
  // of this repro
  { path: '', pathMatch: 'full', redirectTo: 'logged-out' },
  { path: 'logged-in', component: AppComponent },
  { path: 'logged-out', component: AppComponent },

  { path: 'person', component: PersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules }
  )],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
