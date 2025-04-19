import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: 'starter' | 'main' | 'dessert' | 'drink' | 'menu';
  image: string;
  description: string;
  selected?: boolean;
}

export interface MenuDetails {
  menuId: number;
  starters: FoodItem[];
  soups: FoodItem[];
  mainCourses: FoodItem[];
  proteins: FoodItem[];
  drinks: FoodItem[];
  desserts: FoodItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private apollo: Apollo) { }

  getMenu(): Observable<{ data: FoodItem }> {
    return this.apollo.query<FoodItem>({
      query: gql`
        query GetMenu {
          menu {
            id
            name
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }

  private mockMenu: FoodItem[] = [
    {
      id: 1,
      name: 'Menú del día',
      price: 12.99,
      category: 'menu',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      description: 'Incluye entrada, plato principal, bebida y postre'
    },
    {
      id: 2,
      name: 'Menú especial',
      price: 15.99,
      category: 'menu',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      description: 'Selección gourmet con ingredientes premium'
    },
    {
      id: 3,
      name: 'Menú ejecutivo',
      price: 10.99,
      category: 'menu',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      description: 'Opción rápida y completa para el almuerzo'
    }
  ];

  private menuDetails: { [key: number]: MenuDetails } = {
    1: {
      menuId: 1,
      starters: [
        { id: 101, name: 'Lentejas', price: 0, category: 'starter', image: 'https://ejemplo.com/lentejas.jpg', description: 'Lentejas tradicionales' },
        { id: 102, name: 'Frijoles', price: 0, category: 'starter', image: 'https://ejemplo.com/frijoles.jpg', description: 'Frijoles de la casa' }
      ],
      soups: [
        { id: 201, name: 'Sopa de arroz', price: 0, category: 'starter', image: 'https://ejemplo.com/sopa-arroz.jpg', description: 'Sopa de arroz con verduras' },
        { id: 202, name: 'Sopa de huevo', price: 0, category: 'starter', image: 'https://ejemplo.com/sopa-huevo.jpg', description: 'Sopa de huevo en vez de sopa' }
      ],
      proteins: [
        { id: 301, name: 'Carne de res', price: 0, category: 'main', image: 'https://ejemplo.com/carne-res.jpg', description: 'Carne de res a la plancha' },
        { id: 302, name: 'Pollo', price: 0, category: 'main', image: 'https://ejemplo.com/pollo.jpg', description: 'Pollo asado' },
        { id: 303, name: 'Cerdo', price: 0, category: 'main', image: 'https://ejemplo.com/cerdo.jpg', description: 'Cerdo en salsa' }
      ],
      mainCourses: [
        { id: 401, name: 'Arroz blanco', price: 0, category: 'main', image: 'https://ejemplo.com/arroz.jpg', description: 'Arroz blanco tradicional' },
        { id: 402, name: 'Puré de papa', price: 0, category: 'main', image: 'https://ejemplo.com/pure.jpg', description: 'Puré de papa casero' }
      ],
      drinks: [
        { id: 501, name: 'Jugo de maracuyá', price: 0, category: 'drink', image: 'https://ejemplo.com/maracuya.jpg', description: 'Jugo natural de maracuyá' },
        { id: 502, name: 'Coca-Cola', price: 0, category: 'drink', image: 'https://ejemplo.com/coca.jpg', description: 'Refresco de cola' }
      ],
      desserts: [
        { id: 601, name: 'Flan', price: 0, category: 'dessert', image: 'https://ejemplo.com/flan.jpg', description: 'Flan casero' },
        { id: 602, name: 'Gelatina', price: 0, category: 'dessert', image: 'https://ejemplo.com/gelatina.jpg', description: 'Gelatina de sabores' }
      ]
    },
    // Agrega detalles para los otros menús (2 y 3) de manera similar
  };

  getMenuItems(): FoodItem[] {
    return this.mockMenu;
  }

  getMenuDetails(menuId: number): MenuDetails | undefined {
    return this.menuDetails[menuId];
  }
}