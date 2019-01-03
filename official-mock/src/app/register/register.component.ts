import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;

  constructor(private router: Router, 
    private authService: AuthService) { }
  register(infos: {email: string, password: string}) {
    this.authService.emailSignUp(infos.email, infos.password)
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
