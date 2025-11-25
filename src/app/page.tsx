"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Running Shoe',
      image: 'https://images.unsplash.com/photo-1549298713-1aca92f03c4e?auto=format&fit=crop&w=3180&q=80',
      price: '$99.99',
    },
    {
      id: 2,
      name: 'Basketball Shoe',
      image: 'https://images.unsplash.com/photo-1515955656352-a1b9c5cf27ea?auto=format&fit=crop&w=3300&q=80',
      price: '$129.99',
    },
    {
      id: 3,
      name: 'Casual Shoe',
      image: 'https://images.unsplash.com/photo-1606107557195-0a29a5b4b4aa?auto=format&fit=crop&w=3264&q=80',
      price: '$79.99',
    },
    {
      id: 4,
      name: 'Training Shoe',
      image: 'https://images.unsplash.com/photo-1588361403511-5fef9c3c6cb5?auto=format&fit=crop&w=3000&q=80',
      price: '$109.99',
    },
  ];

  const testimonialData = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      comment: 'Great shoes! Very comfortable and stylish.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      comment: 'Good quality and fast shipping.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542296634-52824395e165?auto=format&fit=crop&w=2828&q=80)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Step into Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Find the perfect pair for every occasion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button size="lg">Shop Now</Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4 px-4">
                  <Card className="hover:scale-105 transition-all duration-300">
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <Image src={product.image} alt={product.name} width={300} height={200} className="object-cover rounded-md" />
                    </CardContent>
                    <CardFooter className="text-sm">
                      Price: {product.price}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">About Our Shoe Store</h2>
            <p className="text-gray-700">
              We are passionate about providing high-quality shoes for every style and need. Our collection features the latest trends and timeless classics, ensuring you always find the perfect fit.
            </p>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1560769629-975efa967f52?auto=format&fit=crop&w=2787&q=80"
              alt="About Us"
              width={500}
              height={300}
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-semibold text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <CardDescription>{testimonial.comment}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-center">
        <div className="container">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Find Your Perfect Pair?</h2>
          <Button size="lg">Browse Products</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
