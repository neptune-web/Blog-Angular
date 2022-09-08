import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  blogs: any;
  _id: string = '';
  message = '';

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.myBlogs();
  }


  myBlogs(){
    this.blogService.myBlogs().subscribe((data) => {
      this.blogs = data.blogs;
      console.log(data);
    })
  }


  deleteBlog(_id: string){
    this.blogService.deleteBlog(_id).subscribe(res => {
         this.blogs = this.blogs.filter((blog: { _id: string; }) => blog._id !== _id);
         console.log('Post deleted successfully!');
         this.message = res.message;
         this.router.navigate(['/my-blogs']);
    }, (err) => {
      console.log(err);
    })
    }
  

}


