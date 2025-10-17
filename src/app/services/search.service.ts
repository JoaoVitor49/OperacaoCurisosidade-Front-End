import { Injectable, signal } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new Subject<string>();
  private searchTerm = signal('');
  private hasSearchedFlag = signal(false);

  debouncedSearchTerm$ = this.searchTermSubject.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.hasSearchedFlag.set(true);
    this.searchTermSubject.next(term);
  }

  clearSearchTerm(): void {
    this.searchTerm.set('');
    this.searchTermSubject.next('');
    this.hasSearchedFlag.set(false);
  }

  getSearchTerm(): string {
    return this.searchTerm();
  }

  hasSearched(): boolean {
    return this.hasSearchedFlag();
  }

  resetSearchFlag(): void {
    this.hasSearchedFlag.set(false);
  }
}
