import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    this.http.post<any>('http://localhost:4000/api/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          if (res.success) {
            // ✅ Store user details including 'name'
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/dashboard']);
          } else {
            alert('❌ Login failed');
          }
        },
        error: (err) => {
          alert('❌ Server error');
          console.error(err);
        }
      });
  }
}
}
