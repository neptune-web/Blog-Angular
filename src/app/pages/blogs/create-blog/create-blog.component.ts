import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from '../blog.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  items = ['Business']
  tags: String[] = [];
  title: string='';
  body: string = '';
  
  error: string = '';
  message: string = '';

  
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
  }

  addTags(e: any){
    console.log(e.value);
    this.tags.push(e.value);
    console.log(this.tags);
  }

  createBlog(){
    this.message = '';
    this.blogService.createBlog(this.title, this.body, this.tags ).subscribe((res:any)=> {
      console.log('Blog Created successfully!');
      this.message = res.message;
    }, (err) => {
      this.error = err.error.message;
      console.log(err.error.message);
    })
  }

  submit(){
    this.router.navigate(['/all-blogs']);
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
      placeholder: 'Enter your blog content here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'},
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

  


