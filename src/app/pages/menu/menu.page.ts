import { Component } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { MenuService, FoodItem } from '../../services/menu.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    CurrencyPipe,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButton
  ]
})
export class MenuPage {
  menuItems: FoodItem[] = [];
  menus: any = [];
  restaurants: any = [];

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit() {
    this.loadMenu();
    this.loadRestaurants();
  }

  loadMenu() {
    this.menuService.getMenu().subscribe({
      next: (result) => {
        console.log('Menú cargado:', result.data);
      },
      error: (err) => console.error('Error al cargar el menú:', err),
    });
  }

  loadRestaurants() {
    this.menuService.getRestaurants().subscribe({
      next: (result) => {
        // Aplanamos todos los menús de todos los restaurantes en un solo array
        this.menus = result.data?.restaurants?.flatMap((restaurant: any) => restaurant.menus) || [];
      },
      error: (err) => console.error('Error:', err)
    });
  }

  ionViewWillEnter() {
    this.menuItems = this.menuService.getMenuItems();
  }

  openMenuDetails(menu: any) {
    this.router.navigate(['/menu-details', menu.id], {
      state: { menu }
    });
  }
}