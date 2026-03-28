"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/context/AnalysisContext";
import { runFullAnalysis } from "@/utils/ngowHengAnalyzer";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function AnalysisPage() {
  const router = useRouter();
  const { setReport, setCapturedImage } = useAnalysis();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBRQqiMqV13quyuzBexOkxCKHaruTk2WvUyMT2R2WGkqvIOZFVz2bVU17bd9KvNBXOzvbsisRW3DjfJvwv0F6dG4EG7FbQ2pFmXI2t48GuHWy4YYngQSzI1s-gZHuocczGqmlDGQwpE9Qzlic6jzJbwUdUkcUXmV5r4rfDk7qFYRijtcowoF2W8bXU-dPTPJsBfPvqT9hBp-3S8NkldYLHl3tsTFo-4CEISAR6kZoyeaU9gxkX1JKA1_Q7fGGUHqjiwCoNGVF1OSYk"
  );
  
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err: unknown) {
       console.error(err);
       setErrorMsg("ไม่สามารถเปิดกล้องได้ กรุณาตรวจสอบการอนุญาตใช้งานกล้อง");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Draw straight from the active video feed
      // Using scale to mirror since front camera is usually mirrored
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL("image/jpeg");
      setPreviewSrc(dataUrl);
      setCapturedImage(dataUrl);
      stopCamera();
      
      // Pass the fully materialized canvas synchronously to avoid the WASM crash
      processImage(canvas);
    }
  };

  const handleUploadClick = () => {
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processImage = async (source: HTMLImageElement | HTMLCanvasElement) => {
    try {
      setLoadingText("กำลังอัญเชิญปัญญาประดิษฐ์แห่งสวรรค์...");
      setIsLoading(true);
      setErrorMsg("");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

        const basePath = typeof window !== "undefined" && window.location.hostname.includes("github.io") ? "/Yoon" : "";
        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `${basePath}/models/face_landmarker.task`,
          delegate: "CPU",
        },
        outputFaceBlendshapes: true,
        runningMode: "IMAGE",
        numFaces: 1,
      });

      setLoadingText("กำลังแปลบิตรูปภาพด้วยมนตร์ดำ (Image Processing)...");
      const canvas = document.createElement("canvas");
      canvas.width = source instanceof HTMLImageElement 
        ? (source.naturalWidth || source.width || 500) 
        : (source.width || 500);
      canvas.height = source instanceof HTMLImageElement 
        ? (source.naturalHeight || source.height || 500) 
        : (source.height || 500);
      
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
      }

      setLoadingText("กำลังถอดรหัสจุดประสานวิญญาณบนใบหน้า 478 จุด...");
      const result = faceLandmarker.detect(canvas);

      if (!result || !result.faceLandmarks || result.faceLandmarks.length === 0) {
        throw new Error("ไม่พบใบหน้าในภาพ กรุณาลองใหม่อีกครั้งด้วยแสงที่สว่างขึ้น (พยายามให้เห็นหน้าตรง)");
      }

      setLoadingText("กำลังประมวลผลสัดส่วนโหงวเฮ้งตามคัมภีร์โบราณ...");
      const landmarks = result.faceLandmarks[0];
      
      const report = runFullAnalysis(landmarks);
      
      setReport(report);

      setTimeout(() => {
        router.push("/report");
      }, 1000);

    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "เกิดข้อผิดพลาดจากพลังลี้ลับ กรุณาลองใหม่");
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
    setCapturedImage(url);

    if (imageRef.current) {
      imageRef.current.onload = () => {
        processImage(imageRef.current!);
      };
    }
  };

  return (
    <div className="bg-on-background bg-opacity-95 min-h-screen flex-1 w-full relative overflow-x-hidden text-surface">
      <main className="min-h-screen pt-36 pb-12 px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto items-center lg:items-start">
        <div className="flex-1 flex flex-col items-center justify-center relative w-full">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg
              fill="none"
              height="100%"
              viewBox="0 0 800 800"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 400C100 200 250 100 400 100C550 100 700 250 700 400C700 550 550 700 400 700C250 700 100 550 100 400Z"
                stroke="#fed65b"
                strokeDasharray="10 20"
                strokeWidth="0.5"
              ></path>
            </svg>
          </div>

          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center mb-8">
            <div className={`absolute inset-0 rounded-full border-[6px] border-secondary border-opacity-40 ${isLoading ? 'animate-ping' : 'animate-pulse'}`}></div>
            <div className={`absolute inset-4 rounded-full border-2 border-primary border-opacity-30 ${isCameraActive ? 'animate-spin-slow' : ''}`}></div>

            <div
              className={`w-full h-full rounded-full overflow-hidden ink-wash-bg relative border-4 border-secondary shadow-2xl transition-all duration-1000 ${isLoading ? 'brightness-125 sepia scale-105' : ''}`}
              style={{
                maskImage:
                  "radial-gradient(circle, black 65%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle, black 65%, transparent 70%)",
              }}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className={`w-full h-full object-cover ${isCameraActive ? 'block transform -scale-x-100' : 'hidden'}`}
              />

              <img
                ref={imageRef}
                alt="Face Analysis Portrait"
                className={`w-full h-full object-cover opacity-80 ${!isCameraActive ? 'block' : 'hidden'}`}
                src={previewSrc}
                crossOrigin="anonymous"
              />

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary-fixed text-sm drop-shadow-[0_0_8px_rgba(254,214,91,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2">
                  <span className="material-symbols-outlined text-secondary-fixed text-sm drop-shadow-[0_0_8px_rgba(254,214,91,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-on-background px-4 py-1 border border-secondary text-secondary font-label text-xs uppercase tracking-[0.2em] whitespace-nowrap">
              ยอดเขาสรวงสวรรค์
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-on-background px-4 py-1 border border-secondary text-secondary font-label text-xs uppercase tracking-[0.2em] whitespace-nowrap">
              รากฐานปฐพี
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 text-rose-400 font-label tracking-widest text-center px-4">
              {errorMsg}
            </div>
          )}

          {isLoading ? (
             <div className="text-secondary font-headline animate-pulse text-lg tracking-widest text-center min-h-[60px]">
              {loadingText}
             </div>
          ) : (
             <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
               {isCameraActive ? (
                 <>
                   <button onClick={capturePhoto} className="group relative px-6 py-4 border border-secondary bg-primary bg-opacity-20 hover:bg-opacity-40 transition-all text-on-secondary font-headline font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                     <span className="material-symbols-outlined">camera</span>
                     บันทึกภาพโหงวเฮ้ง
                   </button>
                   <button onClick={stopCamera} className="group relative px-6 py-4 border border-surface-variant text-on-surface-variant font-headline font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-variant hover:text-surface transition-all">
                     ยกเลิก
                   </button>
                 </>
               ) : (
                 <>
                   <button onClick={startCamera} className="group relative px-6 py-4 border border-secondary overflow-hidden bg-background text-secondary font-headline font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-secondary hover:text-on-secondary transition-all">
                     <span className="material-symbols-outlined">photo_camera</span>
                     เปิดกล้องสแกนใบหน้า
                   </button>
                   <button onClick={handleUploadClick} className="group relative px-6 py-4 border border-secondary overflow-hidden text-on-secondary font-headline font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                     <div className="absolute inset-0 gold-shimmer opacity-90"></div>
                     <span className="relative z-10 flex items-center gap-2">
                       <span className="material-symbols-outlined text-on-secondary">upload_file</span>
                       อัปโหลดรูปภาพ
                     </span>
                   </button>
                 </>
               )}
             </div>
          )}
        </div>

        <div className="lg:w-96 flex flex-col gap-6 w-full">
          <div className="relative bg-surface p-6 shadow-xl border border-secondary border-opacity-10 text-on-surface w-full">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary"></div>

            <h3 className="font-headline text-primary font-bold text-lg mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">analytics</span>
              ตัวชี้วัดจากหอสมุดหลวง
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-secondary border-opacity-20 pb-2">
                <span className="font-label text-on-surface-variant text-[10px] md:text-xs uppercase tracking-wider">
                  จุดสังเกตศักดิ์สิทธิ์
                </span>
                <span className="font-headline font-bold text-primary text-sm md:text-base">
                  478 จุด
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-label text-on-surface-variant text-[10px] md:text-xs uppercase tracking-wider">
                  สถานะความสมดุลของชี่
                </span>
                <span className="text-secondary font-bold font-label uppercase text-[10px] tracking-widest animate-pulse">
                  {isLoading ? 'กำลังวิเคราะห์' : (isCameraActive ? 'กำลังรอการเชื่อมต่อ...' : 'พร้อมใช้งาน')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 text-on-surface w-full">
            <h3 className="font-headline text-primary font-bold text-lg mb-4">
              กระบวนการรู้แจ้ง
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="font-headline font-bold text-2xl text-secondary text-opacity-30">01</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-sm">การหาตำแหน่ง</h4>
                  <p className="font-body text-on-surface-variant text-xs mt-1 leading-relaxed">
                    ใช้กล้องหรืออัปโหลดรูปใบหน้าของคุณตรงๆ แสงสว่างสม่ำเสมอ
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="font-headline font-bold text-2xl text-secondary text-opacity-30">02</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-sm">การตรวจจับ (AI)</h4>
                  <p className="font-body text-on-surface-variant text-xs mt-1 leading-relaxed">
                    ระบบ AI โหงวเฮ้งจะสแกนใบหน้าและอ่านจุดเชื่อมต่อประสานวิญญาณ
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="font-headline font-bold text-2xl text-secondary text-opacity-30">03</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-sm">การบัญญัติชะตาชีวิต</h4>
                  <p className="font-body text-on-surface-variant text-xs mt-1 leading-relaxed">
                    อ่านและทำแผนที่บัญชีดิจิทัล เพื่อนำไปสู่รายงานชะตาชีวิตของคุณ
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-secondary p-3 bg-surface-variant bg-opacity-30">
            <p className="font-label text-on-surface-variant text-[9px] uppercase tracking-widest leading-relaxed">
              หมายเหตุ: ข้อมูลโหงวเฮ้งประมวลผลบนเครื่องของคุณ ไม่มีการบันทึกวิดีโอหรือรูปทรงวิญญาณใดๆ สู่เซิร์ฟเวอร์
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
