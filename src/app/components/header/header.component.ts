import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // null | undefined == !null, !undefined = true -> false
    this.loggedIn = !!this.authService.getToken();
    this.authService.notifyLogin$.subscribe(data => {
      this.loggedIn = true;
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.loggedIn = false;
  }

}
