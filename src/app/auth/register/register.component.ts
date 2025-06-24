import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        alert('❌ Passwords do not match');
        return;
      }

      this.http.post('http://localhost:4000/api/register', {
        name, email, password
      }).subscribe({
        next: res => {
          alert('✅ Registration successful');
          console.log(res);
        },
        error: err => {
          alert('❌ Registration failed');
          console.error(err);
        }
      });
    } else {
      alert('❌ Please fill in all required fields');
    }
  }
}
