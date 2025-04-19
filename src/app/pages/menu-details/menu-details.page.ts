import { Component, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { MenuService, MenuDetails, FoodItem } from '../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.page.html',
  styleUrls: ['./menu-details.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButtons,
    IonBackButton,
    CommonModule,
    IonButton,
    FormsModule
  ]
})
export class MenuDetailsPage implements OnInit {
  menuId: number = 0;
  menuName: string = '';
  menuDetails?: MenuDetails;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMenuDetails();
  }

  loadMenuDetails() {
    const menuItem = this.menuService.getMenuItems().find((item: any) => item.id === this.menuId);
    if (menuItem) {
      this.menuName = menuItem.name;
    }

    this.menuDetails = this.menuService.getMenuDetails(this.menuId);

    if (this.menuDetails) {
      // Inicializar la propiedad 'selected' para todos los items de manera segura
      this.initializeSelections(this.menuDetails);
    }
  }

  private initializeSelections(menuDetails: MenuDetails) {
    // Definimos todas las posibles categorías como constantes
    const categories = [
      'starters',
      'soups',
      'proteins',
      'mainCourses',
      'drinks',
      'desserts'
    ] as const;

    categories.forEach(category => {
      const items = menuDetails[category];
      if (items && Array.isArray(items)) {
        items.forEach(item => {
          // TypeScript ahora sabe que item es de tipo FoodItem
          // y que puede tener la propiedad selected
          item.selected = false;
        });
      }
    });
  }

  confirmSelection() {
    if (!this.menuDetails) return;

    // Aquí puedes procesar los items seleccionados
    const selectedItems: FoodItem[] = [];

    const categories = [
      'starters', 'soups', 'proteins',
      'mainCourses', 'drinks', 'desserts'
    ] as const;

    categories.forEach(category => {
      const items = this.menuDetails![category];
      if (items) {
        items.forEach((item: any) => {
          if (item.selected) {
            selectedItems.push(item);
          }
        });
      }
    });

    console.log('Items seleccionados:', selectedItems);
    // Aquí puedes navegar a otra página o procesar la orden
  }
}