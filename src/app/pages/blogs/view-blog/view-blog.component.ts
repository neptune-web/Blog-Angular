import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  _id: String = '';
  blog: any;
  addcomment: String = '';

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const allParams = this.route.snapshot.params;
    const blogId = allParams['blogId'];
    this.viewBlog(blogId)
  }

  viewBlog(blogId: string){
    this.blogService.find(blogId).subscribe((data) => {
      this.blog = data.blogs;
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

  addComment(blogId: string){
    console.log(blogId);
    this.blogService.addComment( blogId, this.addcomment).subscribe(
      (data: any) => {
        this.blog.comments = data.added_comment.comments;
        this.addcomment = '';
        console.log(data);
      }, (err) => {
        console.log(err.message);
      }
    )
  }

  toggleComments(blog: any, e: any){
    e.preventDefault();
    if(blog.showComments){
      blog.showComments = false;
    } else {
      blog.showComments = true;
    }
  }

}
