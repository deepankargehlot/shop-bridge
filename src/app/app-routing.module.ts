import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
{
  path:'',
  redirectTo:'/product-admin',
  pathMatch:'full'
},
{ path: 'product-admin', loadChildren: () => import('./product-admin/product-admin.module').then(m => m.ProductAdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
