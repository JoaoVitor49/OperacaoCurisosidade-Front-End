import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToggleTheme } from "../toggle-theme/toggle-theme";
import { LogoCircle } from "../logo-circle/logo-circle";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout-login',
  imports: [ToggleTheme, LogoCircle, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthLayout {

}