import { ChangeDetectionStrategy, Component, inject, computed} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toggle-theme',
  imports: [MatIconModule],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToggleTheme{
  themeService = inject(ThemeService);
  icon = computed(() => this.themeService.theme() === 'light' ? 'light_mode' : 'dark_mode');

  toggleMode() {
    this.themeService.toggleTheme();
  }
}