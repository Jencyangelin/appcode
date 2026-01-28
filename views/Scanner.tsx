import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { X, CameraOff, Sparkles } from "lucide-react";

const Scanner: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Initial setup for the scanner
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 15,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1.0,
      },
      /* verbose= */ false,
    );

    const onScanSuccess = (decodedText: string) => {
      console.log("Scanned QR:", decodedText);

      try {
        let profileId: string | null = null;

        // Handle URL format: http://localhost:5173/#/card/user123
        if (decodedText.includes("#/card/")) {
          const parts = decodedText.split("#/card/");
          profileId = parts[1].split("?")[0].split("&")[0].trim();
        }
        // Handle direct user ID
        else if (decodedText.match(/^[a-zA-Z0-9_-]+$/)) {
          profileId = decodedText.trim();
        }
        // Handle external links
        else if (decodedText.startsWith("http")) {
          window.location.href = decodedText;
          return;
        }

        if (profileId) {
          console.log("Navigating to card:", profileId);
          scannerRef.current
            ?.clear()
            .then(() => {
              navigate(`/card/${profileId}`);
            })
            .catch((e) => {
              window.location.hash = `#/card/${profileId}`;
            });
          return;
        }

        setError("Unable to read this QR code. Try scanning a QRSync card.");
      } catch (err) {
        console.error("Scanner error:", err);
        setError("Error reading QR code. Try again.");
      }
    };

    const onScanFailure = (error: any) => {
      // Common scanning failures (like blur) are ignored
    };

    scannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((err) => console.debug("Scanner cleanup silent fail"));
      }
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-4">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative animate-in zoom-in-95 duration-500">
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 right-6 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-8 md:p-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optic Handshake</span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            Scan Identity
          </h2>
          <p className="text-slate-500 font-medium mb-10 text-sm">
            Point your lens at a QRSync signature module.
          </p>

          {/* Custom Scanner Styling */}
          <div className="relative group overflow-hidden rounded-[2.5rem] border-4 border-white/5 bg-black/40 shadow-inner">
            <div className="absolute inset-0 border-[16px] border-[#0a0c14] z-10 pointer-events-none"></div>
            <div id="reader" className="relative z-0"></div>

            {/* Scanning Line Overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-20 animate-[scan-line_3s_ease-in-out_infinite]"></div>
          </div>

          <style>{`
            @keyframes scan-line {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
            #reader__status_span { display: none !important; }
            #reader__dashboard_section_csr button {
              background: #4f46e5 !important;
              color: white !important;
              border-radius: 12px !important;
              font-weight: 800 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.1em !important;
              font-size: 10px !important;
              padding: 10px 20px !important;
              border: none !important;
              margin-top: 10px !important;
            }
          `}</style>

          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center space-x-2">
              <CameraOff className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">
                {error}
              </span>
            </div>
          )}

          <div className="mt-12 flex items-center justify-center space-x-2 opacity-30">
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
              Lens Ready for Handshake
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
