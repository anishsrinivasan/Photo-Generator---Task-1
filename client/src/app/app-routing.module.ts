import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'upload/:photoId', component:UploadPageComponent},
  {path:'upload', component:UploadPageComponent},

  {path:'', component:UploadPageComponent},
  {path:'admin', component:AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
