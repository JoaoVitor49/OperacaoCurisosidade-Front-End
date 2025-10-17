import { Component, inject, OnInit, ChangeDetectionStrategy, input, OnDestroy, signal } from '@angular/core';
import { ToggleTheme } from "../toggle-theme/toggle-theme";
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [ToggleTheme, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Header implements OnInit, OnDestroy {
  currentRoute = input.required<string>();
  username = localStorage.getItem('username');

  searchTerm = signal('');
  
  private router = inject(Router);
  private searchService = inject(SearchService);
  private authService = inject(AuthService);
  private subscription: Subscription = new Subscription();

   ngOnInit(): void {
    this.subscription.add(
      this.searchService.debouncedSearchTerm$.subscribe(term => {
        this.searchTerm.set(term);
      })
    );

    this.subscription.add(
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.searchService.clearSearchTerm();
        this.searchTerm.set('');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
    this.searchService.setSearchTerm(this.searchTerm());
  }

  logout() {
    this.authService.logout();
  }
}