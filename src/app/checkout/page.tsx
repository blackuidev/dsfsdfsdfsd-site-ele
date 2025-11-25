// src/app/checkout/page.tsx

"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Define Zod schema for address form validation
const addressSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, { message: "Invalid ZIP code." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
});

// Define Zod schema for payment information
const paymentSchema = z.object({
  cardNumber: z.string().regex(/^[0-9]{16}$/, { message: "Invalid card number." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: "Invalid expiry date." }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, { message: "Invalid CVV." }),
  cardholderName: z.string().min(2, { message: "Cardholder name must be at least 2 characters." }),
});

type AddressFormValues = z.infer<typeof addressSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

const CheckoutPage: React.FC = () => {
  const [useSameAddress, setUseSameAddress] = useState(false);

  // Form for shipping address
  const shippingForm = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema) });
  const { register: registerShipping, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors } } = shippingForm;

  // Form for billing address
  const billingForm = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema) });
  const { register: registerBilling, handleSubmit: handleBillingSubmit, formState: { errors: billingErrors }, setValue: setBillingValue } = billingForm;

  // Form for payment information
  const paymentForm = useForm<PaymentFormValues>({ resolver: zodResolver(paymentSchema) });
  const { register: registerPayment, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors } } = paymentForm;

  const handleShippingFormSubmit = (data: AddressFormValues) => {
    console.log("Shipping Address", data);
    toast.success("Shipping address saved!");
  };

  const handleBillingFormSubmit = (data: AddressFormValues) => {
    console.log("Billing Address", data);
    toast.success("Billing address saved!");
  };

  const handlePaymentFormSubmit = (data: PaymentFormValues) => {
    console.log("Payment Information", data);
    toast.success("Payment information saved!");
  };

  const handlePlaceOrder = () => {
    // Placeholder for order placement logic (e.g., API call)
    console.log("Order placed!");
    toast.success("Order placed successfully!");
  };

  const handleUseSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseSameAddress(event.target.checked);

    if (event.target.checked) {
      // Copy shipping address to billing address
      const shippingData = shippingForm.getValues();
      Object.keys(shippingData).forEach((key) => {
        setBillingValue(key as keyof AddressFormValues, shippingData[key as keyof AddressFormValues]);
      });
    } else {
      // Clear billing address fields
      Object.keys(billingForm.getValues()).forEach((key) => {
        setBillingValue(key as keyof AddressFormValues, "");
      });
    }
  };

  const cartItems = [
    { id: 1, name: "Shoe Model A", quantity: 1, price: 99.99 },
    { id: 2, name: "Shoe Model B", quantity: 2, price: 129.99 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingCost = 10;
  const total = subtotal + shippingCost;

  return (
    <motion.div
      className="container mx-auto py-12 px-4 md:px-8 lg:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address Form */}
        <motion.div className="" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handleShippingSubmit(handleShippingFormSubmit)} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" {...registerShipping("firstName")} />
                    {shippingErrors.firstName && <p className="text-red-500 text-sm">{shippingErrors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" {...registerShipping("lastName")} />
                    {shippingErrors.lastName && <p className="text-red-500 text-sm">{shippingErrors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" type="text" {...registerShipping("address")} />
                  {shippingErrors.address && <p className="text-red-500 text-sm">{shippingErrors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" type="text" {...registerShipping("city")} />
                    {shippingErrors.city && <p className="text-red-500 text-sm">{shippingErrors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" type="text" {...registerShipping("state")} />
                    {shippingErrors.state && <p className="text-red-500 text-sm">{shippingErrors.state.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" type="text" {...registerShipping("zipCode")} />
                    {shippingErrors.zipCode && <p className="text-red-500 text-sm">{shippingErrors.zipCode.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" type="text" {...registerShipping("country")} />
                  {shippingErrors.country && <p className="text-red-500 text-sm">{shippingErrors.country.message}</p>}
                </div>

                <Button type="submit">Save Shipping Address</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Billing Address Form */}
        <motion.div className="" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Input type="checkbox" id="sameAddress" onChange={handleUseSameAddressChange} checked={useSameAddress} />
                <Label htmlFor="sameAddress">Use same as shipping address</Label>
              </div>

              <form onSubmit={handleBillingSubmit(handleBillingFormSubmit)} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingFirstName">First Name</Label>
                    <Input id="billingFirstName" type="text" {...registerBilling("firstName")} disabled={useSameAddress}/>
                    {billingErrors.firstName && <p className="text-red-500 text-sm">{billingErrors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="billingLastName">Last Name</Label>
                    <Input id="billingLastName" type="text" {...registerBilling("lastName")} disabled={useSameAddress}/>
                    {billingErrors.lastName && <p className="text-red-500 text-sm">{billingErrors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="billingAddress">Address</Label>
                  <Input id="billingAddress" type="text" {...registerBilling("address")} disabled={useSameAddress}/>
                  {billingErrors.address && <p className="text-red-500 text-sm">{billingErrors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billingCity">City</Label>
                    <Input id="billingCity" type="text" {...registerBilling("city")} disabled={useSameAddress}/>
                    {billingErrors.city && <p className="text-red-500 text-sm">{billingErrors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="billingState">State</Label>
                    <Input id="billingState" type="text" {...registerBilling("state")} disabled={useSameAddress}/>
                    {billingErrors.state && <p className="text-red-500 text-sm">{billingErrors.state.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="billingZipCode">ZIP Code</Label>
                    <Input id="billingZipCode" type="text" {...registerBilling("zipCode")} disabled={useSameAddress}/>
                    {billingErrors.zipCode && <p className="text-red-500 text-sm">{billingErrors.zipCode.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="billingCountry">Country</Label>
                  <Input id="billingCountry" type="text" {...registerBilling("country")} disabled={useSameAddress}/>
                  {billingErrors.country && <p className="text-red-500 text-sm">{billingErrors.country.message}</p>}
                </div>

                <Button type="submit" disabled={useSameAddress}>Save Billing Address</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Information */}
        <motion.div className="lg:col-span-2" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handlePaymentSubmit(handlePaymentFormSubmit)} className="grid gap-4">
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input id="cardholderName" type="text" {...registerPayment("cardholderName")} />
                  {paymentErrors.cardholderName && <p className="text-red-500 text-sm">{paymentErrors.cardholderName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" type="text" {...registerPayment("cardNumber")} />
                  {paymentErrors.cardNumber && <p className="text-red-500 text-sm">{paymentErrors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                    <Input id="expiryDate" type="text" placeholder="MM/YY" {...registerPayment("expiryDate")} />
                    {paymentErrors.expiryDate && <p className="text-red-500 text-sm">{paymentErrors.expiryDate.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="text" {...registerPayment("cvv")} />
                    {paymentErrors.cvv && <p className="text-red-500 text-sm">{paymentErrors.cvv.message}</p>}
                  </div>
                </div>
                <Button type="submit">Save Payment Information</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Summary */}
        <motion.div className="lg:col-span-1" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between py-2 border-b">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between py-2 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button onClick={handlePlaceOrder} className="w-full">Place Order</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
