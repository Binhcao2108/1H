import React, { useState } from 'react';
import { Download, CheckCircle, Wallet, ArrowRight, Hash } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [employeeName, setEmployeeName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [processStatus, setProcessStatus] = useState<number>(0);
  const [randomAmount, setRandomAmount] = useState<number | null>(null);

  const handleDownload = () => {
    if (!employeeName || !position || !department) return;
    
    setIsDownloading(true);
    setProgress(0);
    setIsCompleted(false);
    setShowBalance(false);
    setProcessStatus(0);
    setRandomAmount(null);

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Tăng ngẫu nhiên từ 5% đến 20% mỗi lần
      currentProgress += Math.floor(Math.random() * 15) + 5;
      
      // Update mock processing steps
      if (currentProgress >= 30) setProcessStatus(1);
      if (currentProgress >= 60) setProcessStatus(2);
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsDownloading(false);
        setIsCompleted(true);
        setProcessStatus(3);
        
        const bonus = Math.floor(Math.random() * 90) * 100000 + 1000000;
        setRandomAmount(bonus);
        setBalance(prev => prev + bonus);
      }
      setProgress(currentProgress);
    }, 400); // Cập nhật mỗi 400ms
  };

  const handleReset = () => {
    setEmployeeName('');
    setPosition('');
    setDepartment('');
    setIsCompleted(false);
    setShowBalance(false);
    setProgress(0);
    setProcessStatus(0);
    setRandomAmount(null);
  };

  const circleCircumference = 2 * Math.PI * 180; // ~1130.97
  const strokeDashoffset = circleCircumference - (circleCircumference * progress) / 100;

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Top Navigation / Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6 md:px-12 bg-slate-900/50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase hidden sm:block">1H Bonus Cloud</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Trạng thái hệ thống</p>
            <p className="text-emerald-400 font-mono text-sm">CONNECTED / SECURE</p>
          </div>
          <div className="w-px h-8 bg-slate-700 hidden md:block"></div>
          <p className="text-slate-400 text-sm italic hidden lg:block">
            Hệ thống xử lý tiền thưởng tự động
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto">
        
        {/* Left Panel: Configuration */}
        <section className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 md:p-10 flex flex-col justify-between bg-slate-900/20">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-blue-400">Cấu Hình Tải Xuống</h2>
            
            <div className="space-y-8">
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Bước 1: Quyền Truy Cập</label>
                <div className="w-full flex items-center justify-between bg-emerald-500/10 border border-emerald-500/50 p-4 rounded-xl text-emerald-400 font-bold">
                  <span>CHO PHÉP DOWNLOAD</span>
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-slate-900" />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Bước 2: Thông Tin Nhân Sự
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    disabled={isDownloading}
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Tên nhân viên..."
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      disabled={isDownloading}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      placeholder="Chức vụ..."
                    />
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      disabled={isDownloading}
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      placeholder="Phòng ban..."
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <label htmlFor="amount" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Bước 3: Chỉ Số Tiền Thưởng
                </label>
                <div className="relative">
                  <div
                    id="amount"
                    className={`w-full bg-slate-800 border-2 ${isCompleted ? 'border-emerald-500 text-emerald-400' : 'border-slate-700 text-slate-500'} rounded-xl p-5 text-2xl font-mono focus:outline-none transition-colors flex items-center min-h-[76px]`}
                  >
                    {isCompleted && randomAmount ? new Intl.NumberFormat('vi-VN').format(randomAmount) : (isDownloading ? 'Đang cấp phát...' : '???')}
                  </div>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">VND</span>
                </div>
                <p className="mt-3 text-sm text-slate-500 italic">* Hệ thống sẽ cấp phát ngẫu nhiên khi tải xuống hoàn tất.</p>
              </div>

              {!isDownloading && !isCompleted && (
                <button
                  onClick={handleDownload}
                  disabled={!employeeName || !position || !department}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-black py-5 rounded-xl text-xl shadow-lg shadow-blue-900/20 uppercase tracking-tighter transition-all flex justify-center items-center gap-2"
                >
                  <Download className="w-6 h-6" />
                  Bắt Đầu Download
                </button>
              )}
              
              {isCompleted && showBalance && (
                <button
                  onClick={handleReset}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-5 rounded-xl text-xl shadow-lg shadow-slate-900/20 uppercase tracking-tighter transition-all flex justify-center items-center gap-2"
                >
                  Tải Thêm Lần Nữa
                  <ArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            {isCompleted && !showBalance && (
               <button
                 onClick={() => setShowBalance(true)}
                 className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl text-lg shadow-lg shadow-emerald-900/20 uppercase tracking-tighter transition-all flex items-center justify-center gap-2 mb-6"
               >
                 <Wallet className="w-5 h-5" />
                 Kiểm Tra Số Dư
               </button>
            )}
            
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Số dư khả dụng</p>
              <div className="flex justify-between items-end flex-wrap gap-4">
                <span className="text-3xl font-mono font-bold text-white break-all">
                  {showBalance ? new Intl.NumberFormat('vi-VN').format(balance) : '***'}
                </span>
                {!showBalance && isCompleted && (
                  <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider animate-pulse">Sẵn sàng</span>
                )}
                {showBalance && (
                  <span className="text-blue-400 text-sm font-bold border-b border-blue-400/30 pb-1">VND</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Visualization */}
        <section className="lg:col-span-8 p-6 md:p-12 flex flex-col items-center justify-center bg-slate-950 relative min-h-[500px]">
          {(isDownloading || isCompleted || progress > 0) ? (
            <>
              <div className="relative flex items-center justify-center">
                {/* Progress Outer Ring */}
                <svg className="w-full max-w-[300px] md:max-w-[400px] aspect-square transform -rotate-90" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                  <motion.circle 
                    cx="200" 
                    cy="200" 
                    r="180" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="transparent" 
                    strokeDasharray={circleCircumference} 
                    strokeDashoffset={strokeDashoffset}
                    className="text-blue-500" 
                    transition={{ duration: 0.2 }}
                  />
                </svg>
                {/* Central Counter */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-6xl md:text-8xl font-black font-mono tracking-tighter">{progress}%</span>
                  <span className="text-blue-400 font-bold uppercase tracking-widest md:tracking-[0.3em] mt-2 text-xs md:text-sm">
                    {isCompleted ? 'Hoàn Tất' : 'Đang Tải Xuống'}
                  </span>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-6 h-6 md:w-8 md:h-8 border-t-4 border-l-4 border-blue-500"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 md:w-8 md:h-8 border-b-4 border-r-4 border-blue-500"></div>
              </div>

              {/* Status Feed */}
              <div className="mt-12 md:mt-16 w-full max-w-md">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Tiến trình xử lý</span>
                  <span className="text-xs text-emerald-400 font-mono">
                    {isCompleted ? 'BÀO HOÀN TẤT' : 'ĐANG CHẠY...'}
                  </span>
                </div>
                <div className="space-y-3 font-mono text-xs md:text-sm">
                  <div className={`flex justify-between ${processStatus >= 0 ? (processStatus > 0 ? 'text-slate-400' : 'text-white font-bold') : 'text-slate-600'}`}>
                    <span>&gt; Khởi tạo gateway bảo mật...</span>
                    {processStatus > 0 ? <span className="text-emerald-500">DONE</span> : (processStatus === 0 && isDownloading ? <span className="animate-pulse text-blue-400">RUNNING</span> : <span>WAIT</span>)}
                  </div>
                  <div className={`flex justify-between ${processStatus >= 1 ? (processStatus > 1 ? 'text-slate-400' : 'text-white font-bold') : 'text-slate-600'}`}>
                    <span>&gt; Xác thực ID: 1H-BONUS...</span>
                    {processStatus > 1 ? <span className="text-emerald-500">DONE</span> : (processStatus === 1 ? <span className="animate-pulse text-blue-400">RUNNING</span> : <span>WAIT</span>)}
                  </div>
                  <div className={`flex justify-between ${processStatus >= 2 ? (processStatus > 2 ? 'text-slate-400' : 'text-white font-bold') : 'text-slate-600'}`}>
                    <span>&gt; Đang chuyển đổi tài sản số...</span>
                    {processStatus > 2 ? <span className="text-emerald-500">DONE</span> : (processStatus === 2 ? <span className="animate-pulse text-blue-400">RUNNING</span> : <span>WAIT</span>)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-600 h-full">
              <Hash className="w-24 h-24 mb-6 opacity-20" />
              <p className="text-xl font-bold uppercase tracking-widest text-slate-500">Hệ Thống Sẵn Sàng</p>
              <p className="text-sm mt-2 text-slate-600 text-center max-w-xs">Nhập số tiền và nhấn bắt đầu để khởi tạo quá trình.</p>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-12 bg-blue-600 shrink-0 flex items-center px-8 justify-between text-[10px] md:text-[11px] font-bold text-white uppercase tracking-widest hidden sm:flex">
        <div className="flex gap-4 md:gap-8">
          <span>Phiên bản: v4.2.0-STABLE</span>
          <span className="hidden md:inline">Vị trí: HỒ CHÍ MINH, VN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>MÁY CHỦ ĐANG HOẠT ĐỘNG BÌNH THƯỜNG</span>
        </div>
      </footer>
    </div>
  );
}
