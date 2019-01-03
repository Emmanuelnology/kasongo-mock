import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }
  register(details: {email: string, password: string}) {
    this.auth.register(details.email, details.password)
      .then (() => {
        this.router.navigate(['/']);
      });
    }

  ngOnInit() {
  }

}
