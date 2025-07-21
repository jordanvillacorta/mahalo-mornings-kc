export interface MenuItem {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const menuItems: Record<string, MenuItem[]> = {
  breads: [
    { 
      name: 'Banana Bread Loaf', 
      description: 'Fresh banana bread loaf with streusel topping', 
      price: '$15.00',
      popular: true
    },
    { 
      name: 'Sweet Dinner Rolls', 
      description: '12 delicious hand made rolls topped with butter', 
      price: '$14.00' 
    },
    { 
      name: 'Pineapple Banana Bread', 
      description: 'Tropical twist on classic banana bread', 
      price: '$13.00' 
    },
    { 
      name: 'White Bread Loaf', 
      description: 'Classic white bread loaf, perfect for sandwiches', 
      price: '$9.00' 
    }
  ],
  pastries: [
    { 
      name: 'Pastel de Nata', 
      description: 'Portuguese custard egg tart', 
      price: '$2.75',
      popular: true
    },
    { 
      name: 'Cinnamon Roll Party Tray', 
      description: 'A smaller version of our classic cinnamon roll. 12 rolls topped with vanilla bean cream cheese icing', 
      price: '$25.00' 
    },
    { 
      name: 'Pistachio Croissant', 
      description: 'Buttery croissant with pistachio filling', 
      price: '$5.25',
      popular: true
    },
    { 
      name: 'Glazed Croissant', 
      description: 'Classic croissant with sweet glaze', 
      price: '$4.00' 
    },
    { 
      name: 'Orange Roll 4 Pack', 
      description: 'Four delicious orange-flavored sweet rolls', 
      price: '$15.00' 
    },
    { 
      name: 'Almond Danish', 
      description: 'Flaky pastry with almond filling', 
      price: '$3.50' 
    }
  ],
  treats: [
    { 
      name: 'Lilikoi Bar', 
      description: 'Tangy passion fruit bar with buttery crust', 
      price: '$3.25',
      popular: true
    },
    { 
      name: 'Scotcharoo', 
      description: 'Peanut butter and butterscotch rice crispy treat', 
      price: '$3.25' 
    },
    { 
      name: 'Cookies n\' Cream Cookie', 
      description: 'Chocolate cookie loaded with cookies and cream', 
      price: '$3.25' 
    },
    { 
      name: 'Hawaiian Cookie', 
      description: 'Island-inspired cookie with tropical flavors', 
      price: '$3.50' 
    },
    { 
      name: 'Confetti Cookie', 
      description: 'Colorful sugar cookie with rainbow sprinkles', 
      price: '$3.00' 
    },
    { 
      name: 'Chocolate Chip Cookie', 
      description: 'Classic chocolate chip cookie, baked fresh daily', 
      price: '$3.25' 
    }
  ]
};

export const categories: MenuCategory[] = [
  { id: 'breads', name: 'Breads & Rolls', emoji: '🍞', description: 'Fresh baked daily' },
  { id: 'pastries', name: 'Pastries', emoji: '🥐', description: 'Artisanal pastries' },
  { id: 'treats', name: 'Cookies & Treats', emoji: '🍪', description: 'Sweet indulgences' }
];

// Cookie selection specifically for Moore Homes page (excludes bars and other treats)
export const mooreHomesCookieSelection: MenuItem[] = [
  { 
    name: 'Cookies n\' Cream Cookie', 
    description: 'Chocolate cookie loaded with cookies and cream', 
    price: '$3.25' 
  },
  { 
    name: 'Hawaiian Cookie', 
    description: 'Island-inspired cookie with tropical flavors', 
    price: '$3.50' 
  },
  { 
    name: 'Confetti Cookie', 
    description: 'Colorful sugar cookie with rainbow sprinkles', 
    price: '$3.00' 
  },
  { 
    name: 'Chocolate Chip Cookie', 
    description: 'Classic chocolate chip cookie, baked fresh daily', 
    price: '$3.25' 
  }
];