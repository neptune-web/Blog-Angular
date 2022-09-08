import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AllBlogsComponent } from './pages/blogs/all-blogs/all-blogs.component';
import { CreateBlogComponent } from './pages/blogs/create-blog/create-blog.component';
import { EditBlogComponent } from './pages/blogs/edit-blog/edit-blog.component';
import { MyBlogsComponent } from './pages/blogs/my-blogs/my-blogs.component';
import { ViewBlogComponent } from './pages/blogs/view-blog/view-blog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-blogs',
    component: AllBlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-blogs',
    component: MyBlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-blogs/:blogId/edit-blog',
    component: EditBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-blogs/:blogId/view-blog',
    component: ViewBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
