import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-item',
  imports: [RouterLink, MatIconModule],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuItem {
  icon = input.required<string>();
  label = input.required<string>()
  route = input.required<string>()
  currentRoute = input.required<string>()
  activeOn = input<string[]>([])

  isActive(): boolean {
    const current = this.currentRoute();
    const mainRoute = this.route();
    const additionalRoutes = this.activeOn();

    return current === mainRoute || additionalRoutes.includes(current);
  }
}