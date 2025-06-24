import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
  if (typeof window !== 'undefined' && localStorage.getItem('user')) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  } else {
    this.router.navigate(['/login']);
  }
}

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
