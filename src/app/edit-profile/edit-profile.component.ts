import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.editForm = this.fb.group({
      name: [user.name, Validators.required],
      email: [user.email]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.http.post<any>('http://localhost:4000/api/update-profile', this.editForm.value).subscribe({
        next: (res) => {
          alert('✅ Profile updated');
          localStorage.setItem('user', JSON.stringify(this.editForm.value));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('❌ Update failed');
          console.error(err);
        }
      });
    }
  }
}
