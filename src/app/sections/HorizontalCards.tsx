"use client";

import { Sprout, Droplet, Sparkles } from 'lucide-react';
import Image from "next/image";
import { motion } from 'framer-motion';

export default function HorizontalCards(){

    const features = [
        {
            icon: Sprout,
            title: "Naturally Harvested",
            description: "Harvested from pristine natural deposits in our region",
            image:"https://images.pexels.com/photos/221471/pexels-photo-221471.jpeg"
        },
        {
            icon: Droplet,
            title: "Rich in Minerals",
            description: "Packed with essential trace minerals for optimal health",
            image:"https://images.pexels.com/photos/2624400/pexels-photo-2624400.jpeg"
        },
        {
            icon: Sparkles,
            title: "Enhances Every Meal",
            description: "Brings out the natural flavors in all your favorite dishes",
            image:"https://images.pexels.com/photos/6690866/pexels-photo-6690866.jpeg"
        }
    ]

    return (
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {features.map((item, index) => {
                const IconComponent = item.icon;
                return(
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="relative w-full  rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:border-gray-300 h-48"
                    >
                        {/* Background Image */}
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                            priority={index === 0}
                        />

                        {/*<div className="absolute inset-0 bg-black/50"></div>*/}

                        <div className="relative w-full z-10 flex flex-col items-center justify-center text-center h-full p-6 space-y-3">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.2, type: "spring" }}
                                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                            >
                                <IconComponent className="w-6 h-6 text-white" />
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                                className="font-semibold text-xl text-white"
                            >
                                {item.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                                className="text-sm text-white/90 leading-relaxed max-w-xs hidden"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    </motion.div>
                )
            })}
        </section>
    )
}