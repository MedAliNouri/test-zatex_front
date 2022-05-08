import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authentification/auth.guard';
import { PreventLoggedInAccess } from './services/authentification/preventLoggedInAccess';
import { ContentLayoutComponent } from './shared/component/content-layout/content-layout.component';
import { content_child } from './utils/content_child';

const routes: Routes = [
  {path:'auth',canActivate:[PreventLoggedInAccess],
loadChildren:()=>import('./component/auth/auth.module').then(a=>a.AuthModule)},
  {path:'',
  component:ContentLayoutComponent,
  canActivate:[AuthGuard],
  children:content_child},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
