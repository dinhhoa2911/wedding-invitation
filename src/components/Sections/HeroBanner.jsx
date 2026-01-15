import React from 'react';
import { ChevronDown } from 'lucide-react';
import { weddingData, albumImages } from '../../constants/weddingConfig';

const HeroBanner = () => (
  <section className="relative h-screen flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] bg-white overflow-hidden">
    <div className="hidden md:block h-full overflow-hidden border-r border-stone-100">
      <img src={albumImages[1]} className="w-full h-full object-cover grayscale-[10%]" alt="Groom Side" />
    </div>
    <div className="relative flex flex-col justify-center items-center px-6 text-center h-full">
      <div className="animate-fade-up space-y-6">
        <span className="font-cormorant text-base md:text-xl tracking-[0.5em] uppercase text-[#545F1B]">Chúng tôi cưới</span>
        <div className="py-4">
          <h1 className="font-cormorant text-5xl md:text-7xl uppercase text-[#545F1B] leading-none">{weddingData.groom}</h1>
          <p className="font-corinthia text-[100px] md:text-[130px] text-[#E6D0AF] -my-10">&</p>
          <h1 className="font-cormorant text-5xl md:text-7xl uppercase text-[#545F1B] leading-none">{weddingData.bride}</h1>
        </div>
        <div className="relative pt-12 pb-4 inline-block">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#E6D0AF]/40"></div>
          <span className="relative bg-white px-8 font-cormorant text-3xl md:text-5xl text-[#545F1B] tracking-[0.2em]">{weddingData.date}</span>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce">
        <ChevronDown size={30} className="text-[#E6D0AF]" />
      </div>
    </div>
    <div className="hidden md:block h-full overflow-hidden border-l border-stone-100">
      <img src={albumImages[0]} className="w-full h-full object-cover grayscale-[10%]" alt="Bride Side" />
    </div>
  </section>
);

export default HeroBanner;