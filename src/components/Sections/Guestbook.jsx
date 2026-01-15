import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Users, Banknote, BookOpen, Heart } from 'lucide-react';
import { MOCK_API_URL, weddingData } from '../../constants/weddingConfig';

const Guestbook = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [responses, setResponses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    isAttending: true,
    guestCount: 1,
    giftAmount: '',
    wish: ''
  });

  // 1. Lấy danh sách lời chúc từ API
  const fetchResponses = async () => {
    try {
      const res = await fetch(MOCK_API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        // Sắp xếp lời chúc mới nhất lên đầu
        setResponses(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // 2. Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      ...formData,
      giftAmount: Number(formData.giftAmount) || 0,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(MOCK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus('success');
        fetchResponses(); // Tải lại danh sách
        // Reset form
        setFormData({ name: '', isAttending: true, guestCount: 1, giftAmount: '', wish: '' });
      }
    } catch (err) {
      setStatus('idle');
      alert("Gửi không thành công, vui lòng thử lại!");
    }
  };

  return (
    <section className="py-24 px-6 bg-[#FFFCF6]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-5xl md:text-6xl uppercase text-[#545F1B]">Sổ lưu bút & RSVP</h2>
          <div className="w-20 h-px bg-[#E6D0AF] mx-auto mt-4"></div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-xl rounded-2xl border border-stone-100">
          {status === 'success' ? (
            <div className="text-center py-10 animate-fade-up">
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
              <h3 className="font-cormorant text-3xl text-[#545F1B] mb-2 uppercase">Cảm ơn bạn!</h3>
              <p className="font-vietnam text-stone-500 italic">Thông tin của bạn đã được gửi đến chúng mình.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-[#545F1B] underline uppercase text-xs font-bold tracking-widest">Gửi thêm lời chúc</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-vietnam">
              {/* Nhập tên */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest block">Tên của bạn *</label>
                <input 
                  required type="text" placeholder="Ví dụ: Anh Nguyễn Văn A"
                  className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#545F1B] transition-all bg-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Xác nhận tham dự */}
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest block">Bạn sẽ tham dự chứ? *</label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" name="attending" checked={formData.isAttending === true}
                      onChange={() => setFormData({...formData, isAttending: true})}
                      className="accent-[#545F1B]"
                    />
                    <span className="text-sm group-hover:text-[#545F1B]">Mình sẽ đến</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" name="attending" checked={formData.isAttending === false}
                      onChange={() => setFormData({...formData, isAttending: false})}
                      className="accent-[#545F1B]"
                    />
                    <span className="text-sm group-hover:text-[#545F1B]">Rất tiếc mình không thể</span>
                  </label>
                </div>
              </div>

              {/* Số người (Chỉ hiện nếu chọn Sẽ đến) */}
              {formData.isAttending && (
                <div className="space-y-2 animate-fade-up">
                  <label className="text-[10px] uppercase font-bold text-[#545F1B] tracking-widest flex items-center gap-2">
                    <Users size={14} /> Số người đi cùng (bao gồm cả bạn)
                  </label>
                  <select 
                    className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#545F1B] bg-transparent cursor-pointer"
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
                  className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#545F1B] bg-transparent"
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
                  className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-[#545F1B] bg-transparent h-24 resize-none"
                  value={formData.wish}
                  onChange={(e) => setFormData({...formData, wish: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#545F1B] text-[#E6D0AF] py-5 uppercase font-bold tracking-[0.3em] text-xs hover:bg-black transition-all shadow-lg flex justify-center items-center gap-2"
              >
                {status === 'submitting' ? "Đang gửi..." : <><Send size={14} /> Gửi xác nhận & Lời chúc</>}
              </button>
            </form>
          )}
        </div>

        {/* Hiển thị danh sách lời chúc */}
        <div className="mt-24 space-y-8">
          <h3 className="font-cormorant text-3xl text-center text-[#545F1B] uppercase tracking-widest mb-12">Lời chúc từ khách mời</h3>
          <div className="grid gap-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {responses.map((item) => (
              <div key={item.id} className="p-8 bg-white border-l-4 border-[#545F1B] rounded-r-xl shadow-sm animate-fade-up">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-[#545F1B] uppercase text-sm tracking-widest">{item.name}</h4>
                  <span className="text-[10px] text-stone-400 uppercase tracking-tighter">
                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="font-vietnam text-stone-600 italic leading-relaxed">"{item.wish}"</p>
                {item.isAttending && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#E6D0AF] uppercase">
                    <Heart size={10} fill="#E6D0AF" /> Tham dự với {item.guestCount} người
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;