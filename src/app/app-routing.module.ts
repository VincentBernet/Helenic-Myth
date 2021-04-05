import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { ArticlesComponent} from './articles/articles.component';
import { ArticleDetailComponent} from './article-detail/article-detail.component';
import { FamilyTreeComponent } from './family-tree/family-tree.component';
import { ShopComponent } from './shop/shop.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component:DashboardComponent},
  {path: 'articles', component:ArticlesComponent},
  {path: 'detail/:id', component:ArticleDetailComponent},
  {path: 'familyTree', component:FamilyTreeComponent},
  {path: 'shop', component:ShopComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
