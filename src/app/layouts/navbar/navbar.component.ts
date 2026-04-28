import { Component, computed, inject, OnInit, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CategoriesData } from '../../core/models/categories-data.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);
  categoryList: WritableSignal<CategoriesData[]> = signal<CategoriesData[]>([]);
  logged = computed(() => this.authService.isLogged());
  count: Signal<number> = computed(() => this.cartService.cartCount());
  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken')
      if (token) {
        this.authService.checkLogin();
        this.getCartData();
      }
    }
    
    // this.authService.isLogged.set(true);
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    
  }
  logout(): void {
    this.authService.logout();
  }
  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
    });
  }
}
