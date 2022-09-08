import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../pages/blogs/blog.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // http Header Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }

  //get all blogs
  getBlogs(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/blogs/all_blogs')
  }

  //adding blog
  createBlog(title: string, body: string, tags: String[]): Observable<any>{
    return this.httpClient.post('http://localhost:3000/blogs/create_blog',
    {title,body, tags},
    this.httpOptions)
  }

  // get blogs by id
  find(_id: string): Observable<any>{
    return this.httpClient.get<Blog[]>('http://localhost:3000/blogs/find/' + _id)
  }

  // update blog
  editBlog(_id: string, title: string, body: string): Observable<any>{
    return this.httpClient.put('http://localhost:3000/blogs/update_blog/' + _id, {title,body}, this.httpOptions)
  }

  //delete blog
  deleteBlog(_id: string): Observable<any>{
    return this.httpClient.delete('http://localhost:3000/blogs/delete_blog/' + _id, this.httpOptions)
  }

  // get my blogs
  myBlogs(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/blogs/your_blogs/')
  }

  // add comment
  addComment(_id: string, comment: String){
    return this.httpClient.put('http://localhost:3000/blogs/add_comment', {_id, comment})
  }
 

}
