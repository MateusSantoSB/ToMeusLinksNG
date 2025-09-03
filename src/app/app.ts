import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNg } from "./header-ng/header-ng";
import { HomeNg } from "./home-ng/home-ng";
import { FooterNg } from "./footer-ng/footer-ng";

@Component({
  selector: 'app-root',
  imports: [HeaderNg, FooterNg, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ToMeusLinks');
}
