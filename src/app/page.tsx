import Hero from "@/app/sections/Hero";
import {ReactElement} from "react";
import About from "@/app/sections/About";
import WhatWeOffer from "@/app/sections/WhatWeOffer";
import FeaturedProducts from "@/app/sections/FeaturedProducts";
import CTA from "@/app/sections/CTA";
import Footer from "@/components/Footer";


export default function Home(): ReactElement {
    return (
        <>
            <Hero/>
            <WhatWeOffer/>
            <About/>
            <FeaturedProducts/>
            <CTA/>
            <Footer/>
        </>
    );
}
