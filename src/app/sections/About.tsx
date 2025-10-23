import {ReactElement} from "react";

export default function About(): ReactElement{
    return (
        <section id="about" className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">

                {/* Left: Image / Video / 3D */}
                <div className="md:w-1/2">
                    <video
                        src=""
                        autoPlay
                        muted
                        loop
                        className="w-full rounded-xl shadow-lg"
                    />
                </div>

                {/* Right: Text */}
                <div className="md:w-1/2 flex flex-col gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        From the Ocean to Your Table
                    </h2>
                    <p className="text-gray-700 text-lg md:text-base leading-relaxed">
                        Our premium sea salt is sustainably harvested from the purest UK seas.
                        Each grain is naturally enriched with essential minerals and carefully processed
                        to retain its purity, flavor, and natural goodness.
                    </p>
                    <p className="text-gray-700 text-lg md:text-base leading-relaxed">
                        Experience the journey of salt — from crystal-clear waters to your kitchen, enhancing
                        every meal with nature’s finest flavors.
                    </p>
                </div>

            </div>
        </section>

    )
}