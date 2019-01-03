import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  constructor(private router: Router, private authService: AuthService) { }

  login(infos: {email: string, password: string}) {
    this.authService.logIn(infos.email, infos.password)
      .then (() => {
        this.router.navigate(['/']);
      }
      )
      .catch((error) => {
      this.error = error.message;
    });
  }

  ngOnInit() {
  }

}
