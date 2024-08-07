import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fromEvent } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('input', { static: true }) input: ElementRef = {} as ElementRef;

  constructor(private router: Router) {}

  routes = [
    {
      title: 'Dashboard',
      link: 'dashboard',
    },
  ];

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((_) => {
          const id = Number(this.input.nativeElement.value);
          if (!isNaN(id) && id > 0) {
            this.router.navigate(['/user', id]);
          }
        }),
      )
      .subscribe();
  }
}
