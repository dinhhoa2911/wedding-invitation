import React from 'react';
import { Heart, Navigation, Calendar as CalendarIcon } from 'lucide-react';
import { eventData } from '../../constants/weddingConfig';

const Events = () => (
  <section className="py-32 bg-[#FFFCF6] relative">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="font-cormorant text-5xl md:text-6xl uppercase text-[#545F1B] mb-24">Sự kiện</h2>
      <div className="space-y-32 relative">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#E6D0AF]/60 hidden md:block"></div>
        {eventData.map((event, idx) => (
          <div key={idx} className="relative z-10 animate-fade-up">
            <div className="relative mb-10 h-24 flex items-center justify-center">
               <Heart className="absolute text-[#E6D0AF]/20 fill-[#E6D0AF]/5" size={120} />
               <h3 className="font-cormorant text-4xl uppercase text-[#545F1B] tracking-[0.2em] relative">{event.type}</h3>
            </div>
            <div className="w-full max-w-2xl mx-auto bg-white p-12 text-center rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-24 h-24 rounded-full border-4 border-[#E6D0AF]/30 flex flex-col items-center justify-center text-[#545F1B]">
                  <span className="text-[10px] uppercase font-bold tracking-tighter opacity-70">Hồi</span>
                  <span className="text-3xl font-bold font-cormorant">{event.time}</span>
                </div>
                <div className="space-y-2">
                   <p className="font-encode font-bold text-xl text-[#545F1B] tracking-[0.2em] uppercase">{event.date}</p>
                   <div className="w-12 h-px bg-[#E6D0AF] mx-auto my-4"></div>
                   <p className="font-cormorant text-2xl md:text-3xl text-stone-600 tracking-wider leading-relaxed italic">{event.address}</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full pt-6">
                  <button className="flex-1 flex items-center justify-center gap-2 border border-[#545F1B] text-[#545F1B] py-3 px-8 text-xs uppercase font-bold tracking-widest">
                    <Navigation size={14} /> Chỉ đường
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#E6D0AF] text-[#545F1B] py-3 px-8 text-xs uppercase font-bold tracking-widest shadow-sm">
                    <CalendarIcon size={14} /> Thêm vào lịch
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Events;