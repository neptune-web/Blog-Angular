import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../blog.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  [x: string]: any;
  _id: string = '';
  blog: any;
  form!: FormGroup;
  title='';
  body='';
  items = ['Business']
  tags: String[] = [];
  
  constructor(public blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const allParams = this.route.snapshot.params;
    const blogId = allParams['blogId'];
    this.editBlog(blogId)
  }

  addTags(e: any){
    console.log(e.value);
    this.tags.push(e.value);
    console.log(this.tags);
  }

  editBlog(blogId: string){
    blogId = this.route.snapshot.params['blogId'];
    this.blogService.find(blogId).subscribe((data) => {
      console.log(data)
      console.log(blogId)
      this.blog = data.blogs;
      console.log(this.blog)
    });

    

  }

  submit(){
    const blogId = this.route.snapshot.params['blogId'];
    this.blogService.editBlog(blogId, this.blog.title, this.blog.body).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigate(['/my-blogs']);
    }, (err) => {
      console.log(err);

    });
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '20rem',
      minHeight: '15rem',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};


}
