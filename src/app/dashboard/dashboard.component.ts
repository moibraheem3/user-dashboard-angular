import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  page = 1;
  per_page: number = 0;
  total: number = 0;
  total_pages: number = 0;
  placeholder = ['1', '2', '3', '4', '5', '6'];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.httpClient
      .get<Response>(`https://reqres.in/api/users?page=${this.page}`)
      .subscribe({
        next: (res) => {
          this.users = res.data;
          this.per_page = res.per_page;
          this.total = res.total;
          this.total_pages = res.total_pages;
        },
        error: (_err) => {
          this.users = [];
          this.per_page = 0;
          this.total = 0;
          this.total_pages = 0;
        },
      });
  }

  next() {
    if (this.page < this.total_pages) {
      this.page++;
      this.getUsers();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.getUsers();
    }
  }
}

type Response = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
