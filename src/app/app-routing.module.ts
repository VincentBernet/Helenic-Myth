import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticlesComponent} from './articles/articles.component';
import { ArticleDetailComponent} from './article-detail/article-detail.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'dashboard', component:DashboardComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'articles', component:ArticlesComponent},
  {path: 'detail/:id', component:ArticleDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
