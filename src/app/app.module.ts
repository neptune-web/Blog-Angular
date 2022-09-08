import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputModule } from 'ngx-chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreateBlogComponent } from './pages/blogs/create-blog/create-blog.component';
import { AllBlogsComponent } from './pages/blogs/all-blogs/all-blogs.component';
import { MyBlogsComponent } from './pages/blogs/my-blogs/my-blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { EditBlogComponent } from './pages/blogs/edit-blog/edit-blog.component';
import { ActivatedRoute } from '@angular/router';
import { ViewBlogComponent } from './pages/blogs/view-blog/view-blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    CreateBlogComponent,
    AllBlogsComponent,
    MyBlogsComponent,
    HomeComponent,
    EditBlogComponent,
    ViewBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TagInputModule, 
    BrowserAnimationsModule,
    AngularEditorModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
