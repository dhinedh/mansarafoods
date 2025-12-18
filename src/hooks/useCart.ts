import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CartItem } from '../types/database';
import { getProductById, getComboById } from '../data/mockData';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartCount(0);
      setLoading(false);
    }
  }, [user]);

  const fetchCart = () => {
    if (!user) return;

    setLoading(true);
    const cartKey = `mansara_cart_${user.id}`;
    const storedCart = localStorage.getItem(cartKey);

    if (storedCart) {
      const items: CartItem[] = JSON.parse(storedCart);
      const itemsWithData = items.map(item => ({
        ...item,
        product: item.product_id ? getProductById(item.product_id) : undefined,
        combo: item.combo_id ? getComboById(item.combo_id) : undefined
      }));
      setCartItems(itemsWithData);
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    } else {
      setCartItems([]);
      setCartCount(0);
    }
    setLoading(false);
  };

  const saveCart = (items: CartItem[]) => {
    if (!user) return;
    const cartKey = `mansara_cart_${user.id}`;
    localStorage.setItem(cartKey, JSON.stringify(items));
  };

  const addToCart = async (productId?: string, comboId?: string, quantity: number = 1) => {
    if (!user) {
      throw new Error('Please login to add items to cart');
    }

    const existingItem = cartItems.find(
      (item) =>
        (productId && item.product_id === productId) ||
        (comboId && item.combo_id === comboId)
    );

    if (existingItem) {
      await updateCartQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const newItem: CartItem = {
        id: 'cart-' + Date.now(),
        user_id: user.id,
        product_id: productId,
        combo_id: comboId,
        quantity,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product: productId ? getProductById(productId) : undefined,
        combo: comboId ? getComboById(comboId) : undefined
      };
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
      saveCart(updatedItems);
    }
  };

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === cartItemId
        ? { ...item, quantity, updated_at: new Date().toISOString() }
        : item
    );
    setCartItems(updatedItems);
    setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
    saveCart(updatedItems);
  };

  const removeFromCart = async (cartItemId: string) => {
    const updatedItems = cartItems.filter(item => item.id !== cartItemId);
    setCartItems(updatedItems);
    setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
    saveCart(updatedItems);
  };

  const clearCart = async () => {
    if (!user) return;
    setCartItems([]);
    setCartCount(0);
    const cartKey = `mansara_cart_${user.id}`;
    localStorage.removeItem(cartKey);
  };

  return {
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart,
  };
}
