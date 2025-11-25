"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
 id: string;
 name: string;
 price: number;
 imageUrl: string;
 quantity: number;
}

const CartPage: React.FC = () => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);
 const [subtotal, setSubtotal] = useState(0);
 const shippingCost = 10; // Example shipping cost
 const { toast } = useToast();

 useEffect(() => {
 // Load cart items from local storage on component mount
 const storedCart = localStorage.getItem('cart');
 if (storedCart) {
 setCartItems(JSON.parse(storedCart));
 }
 }, []);

 useEffect(() => {
 // Calculate subtotal whenever cartItems change
 const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
 setSubtotal(newSubtotal);
 localStorage.setItem('cart', JSON.stringify(cartItems));
 }, [cartItems]);

 const updateQuantity = (id: string, newQuantity: number) => {
 if (newQuantity < 1) return; // Prevent negative or zero quantities

 setCartItems(prevItems =>
 prevItems.map(item =>
 item.id === id ? { ...item, quantity: newQuantity } : item
 )
 );
 };

 const removeItem = (id: string) => {
 setCartItems(prevItems => prevItems.filter(item => item.id !== id));
 toast({
 title: "Item removed from cart",
 description: "This item has been removed from your cart.",
 })
 };

 const handleCheckout = () => {
 // Implement checkout logic here (e.g., redirect to checkout page)
 alert('Proceed to checkout!');
 };

 return (
 <motion.div
 className="container mx-auto p-8"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.5 }}
 >
 <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

 {cartItems.length === 0 ? (
 <p>Your cart is empty.</p>
 ) : (
 <div>
 {cartItems.map(item => (
 <motion.div
 key={item.id}
 layout
 className="mb-4"
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.3 }}
 >
 <Card className="bg-white shadow-md rounded-md">
 <div className="flex items-center p-4">
 <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
 <div>
 <h2 className="text-lg font-semibold">{item.name}</h2>
 <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
 <div className="flex items-center mt-2">
 <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
 <span className="mx-2">{item.quantity}</span>
 <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
 </div>
 </div>
 <div className="ml-auto">
 <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
 </div>
 </div>
 </Card>
 </motion.div>
 ))}

 <Separator className="my-4" />

 <div className="flex justify-between items-center mb-4">
 <span className="font-semibold">Subtotal:</span>
 <span>${subtotal.toFixed(2)}</span>
 </div>

 <div className="flex justify-between items-center mb-4">
 <span className="font-semibold">Shipping:</span>
 <span>${shippingCost.toFixed(2)}</span>
 </div>

 <div className="flex justify-between items-center mb-4">
 <span className="font-semibold">Total:</span>
 <span>${(subtotal + shippingCost).toFixed(2)}</span>
 </div>

 <Button onClick={handleCheckout}>Proceed to Checkout</Button>
 </div>
 )}
 </motion.div>
 );
};

export default CartPage;
