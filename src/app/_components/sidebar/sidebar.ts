import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import { LogoRectangle } from "../logo-rectangle/logo-rectangle";

@Component({
  selector: 'app-sidebar',
  imports: [MenuItem, LogoRectangle],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Sidebar {
  currentRoute = input.required<string>();
}