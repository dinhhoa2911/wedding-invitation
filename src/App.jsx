import React, { useState, useEffect } from 'react';
import { 
  Heart, MapPin, Clock, Send, 
  Volume2, VolumeX, ChevronDown, CalendarPlus, 
  Plus, CheckCircle2, Gift, BookOpen, Menu,
  Navigation, Calendar as CalendarIcon, Users, Banknote
} from 'lucide-react';

// --- CONFIGURATION DATA ---
/**
 * Lưu ý: Để sử dụng biến môi trường trong Vite, bạn phải đặt tiền tố VITE_
 * Ví dụ trong file .env: VITE_MOCK_API_URL=https://...
 * Nếu môi trường build không hỗ trợ import.meta, hãy đảm bảo bạn đang chạy trong project Vite.
 */
const MOCK_API_URL = import.meta.env.VITE_MOCK_API_URL || "";

const weddingData = {
  groom: "Thế Hoàng",
  bride: "Vân Anh",
  date: "24-01-2026",
  invitationTime: "11:00, Thứ 7 ngày 24 tháng 01 năm 2026",
  mainLocation: "Số 28 - Ngõ 32 - Đường Nguyễn Huy Tự - Can Lộc - Hà Tĩnh",
  colors: {
    primary: "#545F1B", // Xanh rêu Olive
    accent: "#E6D0AF",  // Vàng cát Beige
    bg: "#FFFCF6",      // Nền kem sáng
    white: "#FFFFFF",
    dark: "#333333"
  }
};

const timelineData = [
  { date: "18-09-2024", title: "Lần đầu gặp nhau", desc: "Mỗi lời chúc phúc và sự hiện diện của bạn là món quà vô giá với chúng tôi.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600" },
  { date: "05-10-2024", title: "Chuyến đi đầu tiên", desc: "Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp.", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600" },
  { date: "12-11-2024", title: "Hẹn ước trọn đời", desc: "Ngày chúng mình chính thức về chung một nhà dưới sự chúc phúc.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600" }
];

const albumImages = [
  "/assets/images/doi1.jpg",
  "/assets/images/doi2.jpg",
  "/assets/images/doi3.jpg",
  "/assets/images/doi4.jpg",
  "/assets/images/doi5.jpg",
  "/assets/images/doi6.jpg",
  "/assets/images/doi9.jpg",
  "/assets/images/doi8.jpg",
];

const eventData = [
  { type: "Ăn hỏi", time: "10:00", date: "Ngày 20 Tháng 7 Năm 2024", address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội" },
  { type: "Đón dâu", time: "10:00", date: "Ngày 20 Tháng 7 Năm 2024", address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội" },
  { type: "Tiệc cưới", time: "10:00", date: "Ngày 20 Tháng 7 Năm 2024", address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội" }
];

// --- MAIN APP COMPONENT ---
const App = () => {
  const [rsvpStatus, setRsvpStatus] = useState('idle');
  const [isMuted, setIsMuted] = useState(true);
  const [allResponses, setAllResponses] = useState([]);
  
  // State quản lý dữ liệu form đầy đủ các trường yêu cầu
  const [formData, setFormData] = useState({ 
    name: '', 
    isAttending: true, 
    guestCount: 1, 
    giftAmount: '', 
    wish: '' 
  });

  // Lấy danh sách phản hồi từ MockAPI
  const fetchResponses = async () => {
    if (!MOCK_API_URL) return;
    try {
      const res = await fetch(MOCK_API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        // Sắp xếp dữ liệu mới nhất lên đầu
        setAllResponses(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!MOCK_API_URL) {
      alert("Lỗi: URL API chưa được cấu hình trong file .env (VITE_MOCK_API_URL)");
      return;
    }
    setRsvpStatus('submitting');
  
    const payload = {
      name: formData.name,
      isAttending: formData.isAttending,
      guestCount: formData.isAttending ? formData.guestCount : 0,
      giftAmount: Number(formData.giftAmount) || 0,
      wish: formData.wish,
      createdAt: new Date().toISOString()
    };
  
    try {
      const res = await fetch(MOCK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
        setRsvpStatus('success');
        fetchResponses(); // Cập nhật danh sách ngay lập tức
        // Reset form về trạng thái ban đầu
        setFormData({ name: '', isAttending: true, guestCount: 1, giftAmount: '', wish: '' });
      } else {
        throw new Error("Gửi dữ liệu thất bại");
      }
    } catch (err) {
      setRsvpStatus('idle');
      console.error("Lỗi khi gửi dữ liệu:", err);
      alert("Có lỗi xảy ra khi gửi. Vui lòng kiểm tra kết nối API.");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: weddingData.colors.bg }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@300;400;500;600;700&family=Corinthia&family=Be+Vietnam+Pro:wght@100;300;400;700&family=Encode+Sans:wght@300;400;700&family=Pinyon+Script&display=swap');
        .font-cormorant { font-family: 'Cormorant Unicase', serif; }
        .font-corinthia { font-family: 'Corinthia', cursive; }
        .font-pinyon { font-family: 'Pinyon Script', cursive; }
        .font-vietnam { font-family: 'Be Vietnam Pro', sans-serif; }
        .font-encode { font-family: 'Encode Sans', sans-serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #545F1B; }
      `}} />

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        <button className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-[#545F1B] text-white transition-transform hover:scale-110 active:scale-95">
          <Menu size={20} />
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white border-2 border-[#545F1B] transition-transform hover:scale-110"
        >
          {isMuted ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-[#545F1B] animate-pulse" />}
        </button>
      </div>

      {/* SECTION 1: HERO BANNER (3-COLUMN) */}
      <section className="relative h-screen flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] bg-white overflow-hidden">
        <div className="hidden md:block h-full overflow-hidden border-r border-stone-100">
          <img src={albumImages[1]} className="w-full h-full object-cover grayscale-[10%]" alt="Groom Side" />
        </div>
        <div className="relative flex flex-col justify-center items-center px-6 text-center h-full">
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#E6D0AF] opacity-40 hidden md:block"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#E6D0AF] opacity-40 hidden md:block"></div>
          <div className="animate-fade-up space-y-6">
            <span className="font-cormorant text-base md:text-xl tracking-[0.5em] uppercase text-[#545F1B]">Chúng tôi cưới</span>
            <div className="py-4">
              <h1 className="font-cormorant text-5xl md:text-7xl uppercase text-[#545F1B] leading-none tracking-tighter">{weddingData.groom}</h1>
              <p className="font-corinthia text-[100px] md:text-[130px] text-[#E6D0AF] -my-10">&</p>
              <h1 className="font-cormorant text-5xl md:text-7xl uppercase text-[#545F1B] leading-none tracking-tighter">{weddingData.bride}</h1>
            </div>
            <div className="relative pt-12 pb-4 inline-block">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#E6D0AF]/40"></div>
              <span className="relative bg-white px-8 font-cormorant text-3xl md:text-5xl text-[#545F1B] tracking-[0.2em]">{weddingData.date}</span>
            </div>
          </div>
          <div className="absolute bottom-10 animate-bounce text-[#E6D0AF]">
            <ChevronDown size={30} />
          </div>
        </div>
        <div className="hidden md:block h-full overflow-hidden border-l border-stone-100">
          <img src={albumImages[0]} className="w-full h-full object-cover grayscale-[10%]" alt="Bride Side" />
        </div>
        <div className="md:hidden grid grid-cols-2 h-[300px]">
           <img src={albumImages[1]} className="w-full h-full object-cover" alt="" />
           <img src={albumImages[0]} className="w-full h-full object-cover" alt="" />
        </div>
      </section>

      {/* SECTION 2: INVITATION */}
      <section className="py-24 md:py-40 px-6 max-w-5xl mx-auto text-center font-cormorant animate-fade-up">
        <h2 className="text-4xl md:text-6xl uppercase mb-6 text-[#545F1B]">Trân trọng kính mời!</h2>
        <p className="font-vietnam text-stone-400 mb-20 tracking-widest italic uppercase text-xs">Sự hiện diện của bạn là niềm vinh dự của chúng tôi!</p>
        <div className="relative mb-20">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" className="w-full max-h-[350px] object-cover rounded-xl shadow-lg border border-[#E6D0AF]/20" alt="Invitation Banner" />
        </div>
        <div className="space-y-10 border-y border-[#E6D0AF]/30 py-16">
          <p className="font-encode font-bold text-2xl md:text-4xl text-[#545F1B] uppercase leading-relaxed px-4">{weddingData.invitationTime}</p>
          <button className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#E6D0AF]/10 border border-dashed border-[#545F1B] rounded-full text-[#545F1B] text-sm hover:bg-[#E6D0AF]/20 transition-all">
            <Plus size={18} /> Thêm bộ đếm ngược
          </button>
          <p className="font-cormorant text-2xl md:text-4xl text-stone-600 px-4">{weddingData.mainLocation}</p>
        </div>
      </section>

      {/* SECTION 3: PROFILES */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="group space-y-8">
             <div className="relative">
                <div className="absolute -inset-4 bg-[#E6D0AF]/10 rounded-2xl -rotate-3 transition-transform group-hover:rotate-0"></div>
                <img src="/assets/images/trai1.jpg" className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-xl" alt="Chú rể" />
             </div>
             <div className="text-center md:text-left space-y-4">
                <span className="font-encode text-[#545F1B] uppercase tracking-[0.4em] text-xs font-bold">Chú rể</span>
                <h3 className="font-cormorant text-4xl md:text-5xl uppercase text-[#545F1B] tracking-widest">{weddingData.groom}</h3>
                <p className="font-vietnam text-stone-500 italic leading-relaxed text-base">"Mỗi lời chúc phúc và sự hiện diện của bạn là món quà vô giá đối với chúng tôi."</p>
             </div>
          </div>
          <div className="group space-y-8 md:pt-24">
             <div className="relative">
                <div className="absolute -inset-4 bg-[#E6D0AF]/10 rounded-2xl rotate-3 transition-transform group-hover:rotate-0"></div>
                <img src="/assets/images/gai1.jpg" className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-xl" alt="Cô dâu" />
             </div>
             <div className="text-center md:text-right space-y-4">
                <span className="font-encode text-[#545F1B] uppercase tracking-[0.4em] text-xs font-bold">Cô dâu</span>
                <h3 className="font-cormorant text-4xl md:text-5xl uppercase text-[#545F1B] tracking-widest">{weddingData.bride}</h3>
                <p className="font-vietnam text-stone-500 italic leading-relaxed text-base">"Chúng tôi rất vui mừng được sẻ chia khởi đầu mới này cùng những người thân yêu nhất."</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TIMELINE */}
      <section className="py-32 px-6 bg-[#FFFCF6] border-y border-stone-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-cormorant text-5xl md:text-7xl uppercase text-[#545F1B] mb-20">Cột mốc</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {timelineData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group animate-fade-up" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="w-full aspect-[3/4] overflow-hidden rounded-lg shadow-md mb-8">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                </div>
                <div className="space-y-3">
                  <span className="font-encode text-xs font-bold text-[#545F1B] tracking-widest opacity-60 uppercase">NGÀY {item.date}</span>
                  <h4 className="font-cormorant text-2xl uppercase text-[#545F1B] tracking-wider">{item.title}</h4>
                  <div className="w-10 h-px bg-[#E6D0AF] mx-auto my-2"></div>
                  <p className="font-vietnam text-sm text-stone-500 leading-relaxed italic px-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ALBUM */}
      <section className="py-24 px-4 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-cormorant text-5xl md:text-7xl text-[#545F1B] uppercase mb-16 tracking-widest">Ảnh cưới</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {albumImages.map((src, idx) => (
              <div key={idx} className={`overflow-hidden rounded-sm shadow-sm group relative ${idx === 0 || idx === 7 ? 'md:row-span-2' : ''}`}>
                <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in" alt={`Photo ${idx}`} />
              </div>
            ))}
          </div>
          <div className="mt-20">
            <button className="px-14 py-4 bg-[#545F1B] text-white rounded-full font-vietnam text-xs uppercase tracking-[0.3em] hover:bg-black transition-all shadow-lg">Xem thêm ảnh</button>
          </div>
        </div>
      </section>

      {/* SECTION 6: EVENTS (Vertical Timeline) */}
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
                <div className="w-full max-w-2xl mx-auto bg-white p-12 text-center rounded-3xl shadow-sm border border-stone-100 relative group">
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
                      <button className="flex-1 flex items-center justify-center gap-2 border border-[#545F1B] text-[#545F1B] py-3 px-8 text-xs uppercase font-bold tracking-widest hover:bg-[#545F1B] hover:text-white transition-all">
                        <Navigation size={14} /> Chỉ đường
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-[#E6D0AF] text-[#545F1B] py-3 px-8 text-xs uppercase font-bold tracking-widest">
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

      {/* SECTION 7: BANK INFO (Gift) */}
      <section className="py-32 bg-[#545F1B] text-white text-center px-6">
        <Gift className="w-14 h-14 mx-auto mb-8 text-[#E6D0AF]" />
        <h2 className="font-cormorant text-5xl md:text-7xl uppercase mb-10 tracking-widest">Hộp mừng cưới</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto font-vietnam">
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
             <div className="mb-8 mx-auto w-32 h-32 bg-white rounded-lg flex items-center justify-center text-[#545F1B] font-bold text-[8px] uppercase">QR CODE</div>
             <div className="space-y-2">
               <p className="text-[#E6D0AF] font-bold uppercase text-xs tracking-widest mb-4">Mừng cưới chú rể</p>
               <h4 className="font-bold text-2xl uppercase tracking-wider">Ngân hàng MB Bank</h4>
               <p className="text-sm opacity-60 uppercase">{weddingData.groom}</p>
               <p className="text-3xl font-mono tracking-tighter text-[#E6D0AF] pt-4">123 456 789</p>
             </div>
          </div>
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
             <div className="mb-8 mx-auto w-32 h-32 bg-white rounded-lg flex items-center justify-center text-[#545F1B] font-bold text-[8px] uppercase">QR CODE</div>
             <div className="space-y-2">
               <p className="text-[#E6D0AF] font-bold uppercase text-xs tracking-widest mb-4">Mừng cưới cô dâu</p>
               <h4 className="font-bold text-2xl uppercase tracking-wider">Ngân hàng Techcombank</h4>
               <p className="text-sm opacity-60 uppercase">{weddingData.bride}</p>
               <p className="text-3xl font-mono tracking-tighter text-[#E6D0AF] pt-4">987 654 321</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: RSVP & GUESTBOOK (Tính năng đầy đủ đã yêu cầu) */}
      <section className="py-32 px-6 bg-[#FFFCF6]">
        <div className="max-w-3xl mx-auto text-center">
          <BookOpen className="w-10 h-10 mx-auto mb-6 text-[#545F1B]" />
          <h2 className="font-cormorant text-5xl md:text-6xl uppercase text-[#545F1B] tracking-widest mb-20">Sổ lưu bút & RSVP</h2>
          
          <div className="bg-white p-10 md:p-16 shadow-xl rounded-sm border border-stone-100">
            {rsvpStatus === 'success' ? (
              <div className="text-center py-10 animate-fade-up">
                <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
                <h3 className="font-cormorant text-3xl text-[#545F1B] mb-2 uppercase tracking-widest">Gửi thành công!</h3>
                <p className="font-vietnam text-stone-500 italic">Cảm ơn những lời chúc tốt đẹp của bạn.</p>
                <button onClick={() => setRsvpStatus('idle')} className="mt-10 text-[#545F1B] underline text-xs font-bold uppercase tracking-widest">Gửi thêm phản hồi</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 font-vietnam text-left">
                {/* Tên khách mời */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest block">Tên của bạn *</label>
                  <input 
                    required type="text" placeholder="Ví dụ: Anh Nguyễn Văn A"
                    className="w-full border-b border-stone-200 py-4 focus:outline-none focus:border-[#545F1B] transition-all text-lg bg-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Có tham dự hay không */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest block">Bạn sẽ tham dự chứ? *</label>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="attending" checked={formData.isAttending === true}
                        onChange={() => setFormData({...formData, isAttending: true})}
                        className="accent-[#545F1B]"
                      />
                      <span className="text-sm">Mình sẽ đến</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="attending" checked={formData.isAttending === false}
                        onChange={() => setFormData({...formData, isAttending: false})}
                        className="accent-[#545F1B]"
                      />
                      <span className="text-sm">Rất tiếc không thể đến</span>
                    </label>
                  </div>
                </div>

                {/* Số người (chỉ hiện khi có tham dự) */}
                {formData.isAttending && (
                  <div className="space-y-2 animate-fade-up">
                    <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest flex items-center gap-2">
                      <Users size={14} /> Số người đi cùng (bao gồm cả bạn)
                    </label>
                    <select 
                      className="w-full border-b border-stone-200 py-4 focus:outline-none focus:border-[#545F1B] bg-transparent cursor-pointer"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({...formData, guestCount: parseInt(e.target.value)})}
                    >
                      {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} người</option>)}
                    </select>
                  </div>
                )}

                {/* Tiền mừng cưới */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest flex items-center gap-2">
                    <Banknote size={14} /> Tiền mừng cưới (Tùy chọn - VNĐ)
                  </label>
                  <input 
                    type="number" placeholder="Ví dụ: 500000"
                    className="w-full border-b border-stone-200 py-4 focus:outline-none focus:border-[#545F1B] bg-transparent text-lg"
                    value={formData.giftAmount}
                    onChange={(e) => setFormData({...formData, giftAmount: e.target.value})}
                  />
                </div>

                {/* Lời chúc */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest flex items-center gap-2">
                    <BookOpen size={14} /> Lời chúc của bạn *
                  </label>
                  <textarea 
                    required placeholder="Nhập lời chúc tốt đẹp nhất dành cho cô dâu chú rể..."
                    className="w-full border-b border-stone-200 py-4 focus:outline-none focus:border-[#545F1B] bg-transparent h-24 resize-none text-lg"
                    value={formData.wish}
                    onChange={(e) => setFormData({...formData, wish: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={rsvpStatus === 'submitting'}
                  className="w-full bg-[#545F1B] text-[#E6D0AF] py-6 uppercase font-bold tracking-[0.5em] text-sm hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {rsvpStatus === 'submitting' ? "Đang gửi..." : <><Send size={16} /> Gửi xác nhận & Lời chúc</>}
                </button>
              </form>
            )}
          </div>

          {/* Danh sách lời chúc hiển thị từ MockAPI */}
          <div className="mt-24 space-y-8 text-left">
            <h3 className="font-cormorant text-3xl text-center text-[#545F1B] uppercase tracking-widest mb-12">Lời chúc từ khách mời</h3>
            <div className="grid gap-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {allResponses.length > 0 ? allResponses.map((item) => (
                <div key={item.id} className="p-8 bg-white border-l-4 border-[#545F1B] rounded-r-xl shadow-sm animate-fade-up">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-[#545F1B] uppercase text-sm tracking-widest font-encode">{item.name}</h4>
                    <span className="text-[10px] text-stone-400 font-vietnam">
                      {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="font-vietnam text-stone-600 italic leading-relaxed text-base">"{item.wish}"</p>
                  <div className="mt-4 flex flex-wrap gap-4 items-center text-[10px] font-bold text-[#E6D0AF] uppercase tracking-wider">
                    {item.isAttending ? (
                      <span className="flex items-center gap-1"><Users size={12} /> Tham dự ({item.guestCount})</span>
                    ) : (
                      <span className="text-stone-400 font-normal">Rất tiếc không thể tham dự</span>
                    )}
                    {item.giftAmount > 0 && (
                      <span className="flex items-center gap-1 ml-auto text-stone-400 font-normal">Mừng cưới: {Number(item.giftAmount).toLocaleString()}đ</span>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-center text-stone-400 italic font-vietnam py-10">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 text-center bg-white border-t border-stone-100 relative overflow-hidden">
        <p className="font-pinyon text-5xl md:text-7xl text-[#545F1B] mb-12 tracking-widest">{weddingData.groom} & {weddingData.bride}</p>
        <div className="flex justify-center items-center gap-6 mb-12">
          <div className="w-16 h-px bg-[#E6D0AF]"></div>
          <Heart size={20} className="text-[#545F1B] fill-[#545F1B]" />
          <div className="w-16 h-px bg-[#E6D0AF]"></div>
        </div>
        <p className="font-encode text-[10px] text-stone-400 uppercase tracking-[0.7em]">&copy; 2024 THIEPCUOI ONLINE - DESIGNED FOR YOU</p>
      </footer>
    </div>
  );
};

export default App;