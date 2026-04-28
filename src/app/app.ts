import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { FooterComponent } from './layouts/footer/footer.component';
import { LoadingService } from './core/services/loadingService/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent , FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('freshcart');
  loadingService = inject(LoadingService)
}
