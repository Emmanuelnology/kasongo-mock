import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  login(details: {email: string, password: string}) {
    this.auth.login(details.email, details.password)
      .then (() => {
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
  }

}
