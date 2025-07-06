// API Configuration and Types
export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
  createdAt: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isVeg: boolean;
  isPopular: boolean;
  isAvailable: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'ready' | 'completed' | 'cancelled';
  date: string;
  estimatedTime?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Mock Data Storage Keys
const STORAGE_KEYS = {
  USERS: 'canteen_users',
  MENU_ITEMS: 'canteen_menu_items',
  ORDERS: 'canteen_orders',
  CART: 'canteen_cart',
  CONTACT_MESSAGES: 'canteen_contact_messages',
  CURRENT_USER: 'user'
} as const;

// Utility Functions
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Initialize default menu items
const initializeMenuItems = (): void => {
  const existingItems = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
  if (existingItems.length === 0) {
    const defaultMenuItems: MenuItem[] = [
      {
        id: 1,
        name: "Masala Dosa",
        price: 80,
        category: "breakfast",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        description: "Crispy rice pancake served with potato filling, sambar and chutney",
        isVeg: true,
        isPopular: true,
        isAvailable: true,
      },
      {
        id: 2,
        name: "Samosa",
        price: 25,
        category: "snacks",
        image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
        description: "Crispy pastry filled with spiced potatoes and peas",
        isVeg: true,
        isPopular: true,
        isAvailable: true,
      },
      {
        id: 3,
        name: "Chicken Biryani",
        price: 150,
        category: "lunch",
        image: "https://images.pexels.com/photos/7390558/pexels-photo-7390558.jpeg",
        description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
        isVeg: false,
        isPopular: true,
        isAvailable: true,
      },
      {
        id: 4,
        name: "Paneer Butter Masala",
        price: 130,
        category: "lunch",
        image: "https://images.pexels.com/photos/3590401/pexels-photo-3590401.jpeg",
        description: "Cottage cheese cubes in rich tomato and butter gravy",
        isVeg: true,
        isPopular: false,
        isAvailable: true,
      },
      {
        id: 5,
        name: "Masala Chai",
        price: 20,
        category: "beverages",
        image: "https://images.pexels.com/photos/5946630/pexels-photo-5946630.jpeg",
        description: "Traditional Indian spiced tea with milk",
        isVeg: true,
        isPopular: false,
        isAvailable: true,
      },
      {
        id: 6,
        name: "Gulab Jamun",
        price: 40,
        category: "desserts",
        image: "https://images.pexels.com/photos/7449105/pexels-photo-7449105.jpeg",
        description: "Sweet milk solids balls soaked in sugar syrup",
        isVeg: true,
        isPopular: false,
        isAvailable: true,
      },
      {
        id: 7,
        name: "Cold Coffee",
        price: 60,
        category: "beverages",
        image: "https://images.pexels.com/photos/4271412/pexels-photo-4271412.jpeg",
        description: "Refreshing cold coffee blended with ice and milk",
        isVeg: true,
        isPopular: false,
        isAvailable: true,
      },
      {
        id: 8,
        name: "Veg Pulao",
        price: 100,
        category: "lunch",
        image: "https://images.pexels.com/photos/5410422/pexels-photo-5410422.jpeg",
        description: "Fragrant rice cooked with mixed vegetables and spices",
        isVeg: true,
        isPopular: false,
        isAvailable: true,
      },
      {
        id: 9,
        name: "Egg Fried Rice",
        price: 120,
        category: "lunch",
        image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
        description: "Chinese style rice stir-fried with eggs and vegetables",
        isVeg: false,
        isPopular: true,
        isAvailable: true,
      },
    ];
    setToStorage(STORAGE_KEYS.MENU_ITEMS, defaultMenuItems);
  }
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
      const user = users.find(u => u.email === email);
      
      if (!user) {
        // For demo purposes, create a new user if not found
        const newUser: User = {
          id: generateId(),
          email,
          name: 'Demo User',
          isLoggedIn: true,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        setToStorage(STORAGE_KEYS.USERS, users);
        setToStorage(STORAGE_KEYS.CURRENT_USER, newUser);
        
        return { success: true, data: newUser, message: 'Login successful' };
      }
      
      const loggedInUser = { ...user, isLoggedIn: true };
      setToStorage(STORAGE_KEYS.CURRENT_USER, loggedInUser);
      
      return { success: true, data: loggedInUser, message: 'Login successful' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  },

  register: async (name: string, email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }
      
      const newUser: User = {
        id: generateId(),
        email,
        name,
        isLoggedIn: false,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      setToStorage(STORAGE_KEYS.USERS, users);
      
      return { success: true, data: newUser, message: 'Registration successful' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  },

  logout: async (): Promise<ApiResponse<null>> => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return { success: true, message: 'Logout successful' };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  },

  getCurrentUser: (): User | null => {
    return getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }
};

// Menu API
export const menuAPI = {
  getMenuItems: async (category?: string): Promise<ApiResponse<MenuItem[]>> => {
    try {
      // Initialize menu items if not present
      initializeMenuItems();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let items = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
      
      if (category && category !== 'all') {
        items = items.filter(item => item.category === category);
      }
      
      return { success: true, data: items };
    } catch (error) {
      return { success: false, error: 'Failed to fetch menu items' };
    }
  },

  getMenuItem: async (id: number): Promise<ApiResponse<MenuItem>> => {
    try {
      const items = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
      const item = items.find(item => item.id === id);
      
      if (!item) {
        return { success: false, error: 'Menu item not found' };
      }
      
      return { success: true, data: item };
    } catch (error) {
      return { success: false, error: 'Failed to fetch menu item' };
    }
  },

  searchMenuItems: async (query: string): Promise<ApiResponse<MenuItem[]>> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const items = getFromStorage<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
      const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      return { success: true, data: filteredItems };
    } catch (error) {
      return { success: false, error: 'Search failed' };
    }
  }
};

// Cart API
export const cartAPI = {
  getCart: (): CartItem[] => {
    return getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
  },

  addToCart: async (item: MenuItem, quantity: number = 1): Promise<ApiResponse<CartItem[]>> => {
    try {
      const cart = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image
        });
      }
      
      setToStorage(STORAGE_KEYS.CART, cart);
      return { success: true, data: cart, message: 'Item added to cart' };
    } catch (error) {
      return { success: false, error: 'Failed to add item to cart' };
    }
  },

  updateCartItem: async (itemId: number, quantity: number): Promise<ApiResponse<CartItem[]>> => {
    try {
      const cart = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
      const itemIndex = cart.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) {
        return { success: false, error: 'Item not found in cart' };
      }
      
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      
      setToStorage(STORAGE_KEYS.CART, cart);
      return { success: true, data: cart };
    } catch (error) {
      return { success: false, error: 'Failed to update cart item' };
    }
  },

  removeFromCart: async (itemId: number): Promise<ApiResponse<CartItem[]>> => {
    try {
      const cart = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
      const updatedCart = cart.filter(item => item.id !== itemId);
      
      setToStorage(STORAGE_KEYS.CART, updatedCart);
      return { success: true, data: updatedCart, message: 'Item removed from cart' };
    } catch (error) {
      return { success: false, error: 'Failed to remove item from cart' };
    }
  },

  clearCart: async (): Promise<ApiResponse<null>> => {
    try {
      setToStorage(STORAGE_KEYS.CART, []);
      return { success: true, message: 'Cart cleared' };
    } catch (error) {
      return { success: false, error: 'Failed to clear cart' };
    }
  },

  getCartTotal: (): number => {
    const cart = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemCount: (): number => {
    const cart = getFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};

// Orders API
export const ordersAPI = {
  createOrder: async (items: CartItem[]): Promise<ApiResponse<Order>> => {
    try {
      const user = authAPI.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = 20;
      
      const newOrder: Order = {
        id: generateId(),
        userId: user.id,
        items,
        total: total + deliveryFee,
        status: 'preparing',
        date: new Date().toISOString(),
        estimatedTime: '15-20 min'
      };
      
      const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
      orders.unshift(newOrder);
      setToStorage(STORAGE_KEYS.ORDERS, orders);
      
      // Clear cart after successful order
      await cartAPI.clearCart();
      
      return { success: true, data: newOrder, message: 'Order placed successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to create order' };
    }
  },

  getUserOrders: async (): Promise<ApiResponse<Order[]>> => {
    try {
      const user = authAPI.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
      const userOrders = orders.filter(order => order.userId === user.id);
      
      return { success: true, data: userOrders };
    } catch (error) {
      return { success: false, error: 'Failed to fetch orders' };
    }
  },

  getOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
    try {
      const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
      const order = orders.find(order => order.id === orderId);
      
      if (!order) {
        return { success: false, error: 'Order not found' };
      }
      
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: 'Failed to fetch order' };
    }
  },

  cancelOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
    try {
      const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        return { success: false, error: 'Order not found' };
      }
      
      if (orders[orderIndex].status === 'completed') {
        return { success: false, error: 'Cannot cancel completed order' };
      }
      
      orders[orderIndex].status = 'cancelled';
      setToStorage(STORAGE_KEYS.ORDERS, orders);
      
      return { success: true, data: orders[orderIndex], message: 'Order cancelled successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to cancel order' };
    }
  },

  reorder: async (orderId: string): Promise<ApiResponse<Order>> => {
    try {
      const orderResponse = await ordersAPI.getOrder(orderId);
      if (!orderResponse.success || !orderResponse.data) {
        return { success: false, error: 'Original order not found' };
      }
      
      return await ordersAPI.createOrder(orderResponse.data.items);
    } catch (error) {
      return { success: false, error: 'Failed to reorder' };
    }
  }
};

// Contact API
export const contactAPI = {
  sendMessage: async (name: string, email: string, subject: string, message: string): Promise<ApiResponse<ContactMessage>> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMessage: ContactMessage = {
        id: generateId(),
        name,
        email,
        subject,
        message,
        date: new Date().toISOString(),
        status: 'new'
      };
      
      const messages = getFromStorage<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, []);
      messages.unshift(newMessage);
      setToStorage(STORAGE_KEYS.CONTACT_MESSAGES, messages);
      
      return { success: true, data: newMessage, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to send message' };
    }
  },

  getMessages: async (): Promise<ApiResponse<ContactMessage[]>> => {
    try {
      const messages = getFromStorage<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, []);
      return { success: true, data: messages };
    } catch (error) {
      return { success: false, error: 'Failed to fetch messages' };
    }
  }
};

// Initialize the API when the module loads
if (typeof window !== 'undefined') {
  initializeMenuItems();
}