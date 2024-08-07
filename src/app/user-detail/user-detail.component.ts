import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  user: User | undefined = undefined;

  constructor(
    private httpClient: HttpClient,
    private activeRouter: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.getUser(params['id']);
    });
  }

  getUser(id: number) {
    this.user = undefined;
    this.httpClient
      .get<Response>(`https://reqres.in/api/users/${id}`)
      .subscribe({
        next: (res) => {
          this.user = res.data;
        },
        error: (err) => {
          console.log(err);
          this.location.back();
        },
      });
  }

  goBack() {
    this.location.back();
  }
}

type Response = {
  data: User;
};

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
