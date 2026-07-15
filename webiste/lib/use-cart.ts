"use client";

import { useEffect, useMemo, useState } from "react";

export type Cart = Record<number, number>;

const CART_STORAGE_KEY = "barberoos-cart";

function readStoredCart(): Cart {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!value) {
      return {};
    }

    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed)
        .map(([id, quantity]) => [Number(id), Number(quantity)])
        .filter(([id, quantity]) => Number.isFinite(id) && Number.isFinite(quantity) && quantity > 0),
    );
  } catch {
    return {};
  }
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    setCart(readStoredCart());

    function handleStorage(event: StorageEvent) {
      if (event.key === CART_STORAGE_KEY) {
        setCart(readStoredCart());
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(() => Object.values(cart).reduce((sum, item) => sum + item, 0), [cart]);

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  function removeFromCart(id: number) {
    setCart((current) => {
      const nextQty = (current[id] || 0) - 1;
      const next = { ...current };
      if (nextQty <= 0) {
        delete next[id];
      } else {
        next[id] = nextQty;
      }
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  return { cart, cartCount, addToCart, removeFromCart, clearCart };
}
