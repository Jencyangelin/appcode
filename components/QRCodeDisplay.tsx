
import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Copy, Check, Palette, RotateCcw } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
  title: string;
}

type QRSize = 'Small' | 'Medium' | 'Large';
type QRFormat = 'PNG' | 'SVG';

const SIZE_MAP: Record<QRSize, number> = {
  'Small': 250,
  'Medium': 500,
  'Large': 1000
};

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, title }) => {
  const [copied, setCopied] = useState(false);
  const [selectedSize, setSelectedSize] = useState<QRSize>('Medium');
  const [selectedFormat, setSelectedFormat] = useState<QRFormat>('PNG');
  const [fgColor, setFgColor] = useState('#0F172A'); // Default Slate 900
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetColors = () => {
    setFgColor('#0F172A');
    setBgColor('#FFFFFF');
  };

  const handleDownload = () => {
    const svg = document.querySelector('#qr-code-svg') as SVGElement;
    if (!svg) return;

    const fileName = `QRSync-Card-${title.replace(/\s+/g, '-')}-${selectedSize.toLowerCase()}`;

    if (selectedFormat === 'SVG') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${fileName}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      const size = SIZE_MAP[selectedSize];
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0, size, size);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${fileName}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 flex flex-col items-center transition-colors">
      <div 
        className="p-8 rounded-[2rem] mb-6 border border-slate-100 dark:border-white/5 relative group transition-all"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
        <QRCodeSVG 
          id="qr-code-svg"
          value={value} 
          size={200}
          level="H"
          fgColor={fgColor}
          bgColor={bgColor}
          includeMargin={false}
          imageSettings={{
            src: "https://picsum.photos/seed/qrsync/80/80",
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>
      
      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-slate-400 dark:text-slate-500 text-sm mb-8 text-center max-w-xs font-medium">
        Customize and export your professional portal.
      </p>

      {/* Design Options Panel */}
      <div className="w-full mb-6 p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-6">
        {/* Colors Row */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Palette className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Brand Colors</span>
            </div>
            <button 
              onClick={resetColors}
              className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md transition-colors text-slate-400"
              title="Reset to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase ml-1">Pattern</label>
              <div className="flex items-center bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-white/5">
                <input 
                  type="color" 
                  value={fgColor} 
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                />
                <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase">{fgColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase ml-1">Background</label>
              <div className="flex items-center bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-white/5">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                />
                <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>

        {/* Resolution & Format Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Resolution</span>
            <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-white/5">
                {(['Small', 'Medium', 'Large'] as QRSize[]).map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${selectedSize === size ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {size[0]}
                    </button>
                ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Format</span>
            <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-white/5">
                {(['PNG', 'SVG'] as QRFormat[]).map((format) => (
                    <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${selectedFormat === format ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {format}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button 
          onClick={handleDownload}
          className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 px-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Save {selectedFormat}</span>
        </button>
        <button 
          onClick={handleCopy}
          className="flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-4 px-4 rounded-2xl font-black text-sm border-2 border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 transition active:scale-95"
        >
          {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Copy Link'}</span>
        </button>
      </div>

      <div className="mt-6 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.2em]">Ready for Export</span>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
