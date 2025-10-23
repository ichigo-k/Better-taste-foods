import Hero from "@/app/sections/Hero";
import {ReactElement} from "react";
import About from "@/app/sections/About";
import HorizontalScrollCards from "@/app/sections/HorizontalCards";


export default function Home(): ReactElement {
    return (
        <>
            <Hero/>
            <HorizontalScrollCards/>
        </>
    );
}
