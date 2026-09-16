'use client';

export type CartItem = { slug: string; name: string; price: number; quantity: number };
const KEY = 'friendly-supply-cart-v1';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
export function setCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('friendly-cart-change'));
}
export function addToCart(item: CartItem) {
  const items = getCart();
  const existing = items.find(x => x.slug === item.slug);
  if (existing) existing.quantity += item.quantity;
  else items.push(item);
  setCart(items);
}
export function removeFromCart(slug: string) { setCart(getCart().filter(x => x.slug !== slug)); }
export function updateCart(slug: string, quantity: number) {
  if (quantity < 1) return removeFromCart(slug);
  setCart(getCart().map(x => x.slug === slug ? { ...x, quantity } : x));
}
