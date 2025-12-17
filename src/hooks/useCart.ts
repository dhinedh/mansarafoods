import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { CartItem } from '../types/database';

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

  const fetchCart = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('cart')
      .select(`
        *,
        product:products(*),
        combo:combos(*)
      `)
      .eq('user_id', user.id);

    if (!error && data) {
      setCartItems(data);
      setCartCount(data.reduce((sum, item) => sum + item.quantity, 0));
    }
    setLoading(false);
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
      const { error } = await supabase.from('cart').insert({
        user_id: user.id,
        product_id: productId,
        combo_id: comboId,
        quantity,
      });

      if (error) throw error;
      await fetchCart();
    }
  };

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    const { error } = await supabase
      .from('cart')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('id', cartItemId);

    if (error) throw error;
    await fetchCart();
  };

  const removeFromCart = async (cartItemId: string) => {
    const { error } = await supabase.from('cart').delete().eq('id', cartItemId);

    if (error) throw error;
    await fetchCart();
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase.from('cart').delete().eq('user_id', user.id);

    if (error) throw error;
    await fetchCart();
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
