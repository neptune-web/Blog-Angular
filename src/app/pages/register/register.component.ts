import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : any = '';
  email : any = '';
  password : any = '';

  registerError = false;
  errorMsg = ''
  loading = false;

  fg : any = null;
  fb = new FormBuilder();

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/all-blogs']);
    }
    this.fg = this.fb.group({
      name: ['', [Validators.minLength(4)]],
      email : ['',[Validators.email]],
      password : ['',[Validators.minLength(4)]],
    });
    this.fg.valueChanges.subscribe((data : any) => console.log(data));
  }

  register(){
    this.registerError = false;
    this.loading = true;
    const data : any = {
      name :  this.fg.get('name').value,
      email: this.fg.get('email').value,
      password: this.fg.get('password').value
    }
    if (!this.fg.get('name').errors && !this.fg.get('email').errors && !this.fg.get('password').errors) {
      this.authService.register(data).subscribe(
        (res: any) => {
          console.log(res.message);
          this.router.navigate(['/login']);
        },(err) => {
          console.log(err.message);
          this.registerError = true;
          this.loading = false;
        },
      );
    } else {
      this.registerError = true;
      this.errorMsg = 'Please Enter Valid Data';
      this.loading = false;
    }
  }

}

