"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/context/AnalysisContext";
import Button from "@/components/Button";
import { ZoneAnalysis, MetricResult } from "@/utils/ngowHengAnalyzer";

export default function ReportPage() {
  const router = useRouter();
  const { report, capturedImage } = useAnalysis();

  useEffect(() => {
    if (!report) {
      // If accessed directly without scanning, redirect to analysis
      router.push("/analysis");
    }
  }, [report, router]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary animate-pulse text-2xl font-headline tracking-widest uppercase">
        กำลังเปิดบันทึกสวรรค์...
      </div>
    );
  }

  // Choose the best verdict from the zone to feature as the title/description
  const getPrimaryResult = (zone: ZoneAnalysis) => {
     // Prioritize warning/negative for attention, or just the first one
     return zone.results.find((r: MetricResult) => r.icon === "❌" || r.icon === "⚠️") || zone.results[0];
  };

  const zones = [
    {
      id: "eyes",
      title: "ดวงตา (Eyes)",
      icon: "visibility",
      colorClass: "text-[#ffd700]", // gold
      data: report.eyes,
    },
    {
      id: "nose",
      title: "จมูก (Nose)",
      icon: "airline_seat_recline_normal",
      colorClass: "text-[#00c8ff]", // cyan
      data: report.nose,
    },
    {
      id: "mouth",
      title: "ปาก (Mouth)",
      icon: "record_voice_over",
      colorClass: "text-[#00e664]", // green
      data: report.mouth,
    },
    {
      id: "jaw",
      title: "วังทั้ง 3 และคาง (Palaces)",
      icon: "account_balance",
      colorClass: "text-[#e650dc]", // purple
      data: report.jaw,
    }
  ];

  return (
    <div className="bg-background font-body text-on-surface flex-1 w-full relative">
      <main className="pt-24 pb-20">
        <section className="relative w-full min-h-[716px] flex flex-col items-center justify-center overflow-hidden px-6 py-20">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
            <img
              className="w-full h-full object-cover grayscale sepia"
              alt="ancient celestial map"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDwEvkJt8fmukq4MTkD61b55bPYHXUymcICauz8tsQRL5HYIbwLGdum6gZznfUMypXl_63XaOii2ajWt97nk5OfyFn2Be3QK6f3gZmZ7WPPpFa89s6mNJnvHarsHOyO6ENJr2Ax_0vOFpthnkUT0XedW2BVeeVIbm-jX2P_P4MtsGcRer8Y0k8cVLQxlx41I_rjOVcVa_PZs8eabjaeFZmWkiAbh8jVArtVJ1S73TCeM-wyW9kEmcOOLNJxlpOp59jonBBVOUI9NI"
            />
          </div>

          <div className="relative z-10 mb-12 flex flex-col items-center">
             <div className="mb-6 font-headline text-3xl font-bold text-secondary animate-pulse tracking-widest">
               คะแนนรวมชะตาชีวิต: {report.totalScore} / 24
             </div>

            <div className="w-64 h-64 md:w-80 md:h-80 p-4 imperial-gradient shadow-2xl relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, #fed65b 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="w-full h-full border-[6px] border-secondary relative flex items-center justify-center bg-[#410000]">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-secondary"></div>
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-secondary"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-secondary"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-secondary"></div>

                <div className="relative w-[90%] h-[90%] overflow-hidden">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    alt="dignified portrait of an imperial scholar"
                    src={capturedImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDdSDStdqqdKrBY86Dj1NlWjKz9l6fHaWhMa3N3T2oMCa454p-dQVDbLnrqfFvHR2hAOn-nevE05K2Ie7nR8hAsnVHbseey7PKKZ6N3jQ0KFO5NnWRpOlUwTzYgdCV7xPltuSE54xaJNYUX-IJrAZOzbiFv4wrKIIacedO6Snzieijgm9nxnHA6XUopAM-6Ht4RcMhcBPv7mgQVWLjOSO9h5RcI6OmQAaZtFywb4BNh_oYyhtH8ZijhyCVVuOPxtK4AqnYAXyZsOv8"}
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-12">
              <div className="w-1 h-24 bg-primary relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-4 after:bg-secondary after:rounded-full"></div>
              <div className="w-1 h-32 bg-primary relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-4 after:bg-secondary after:rounded-full"></div>
              <div className="w-1 h-24 bg-primary relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-4 after:bg-secondary after:rounded-full"></div>
            </div>
          </div>

          <div className="relative z-10 text-center space-y-4">
            <span className="font-label text-secondary tracking-[0.4em] uppercase text-sm block">
              บันทึกสวรรค์ MMXXIV
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-primary tracking-tighter drop-shadow-[0_4px_12px_rgba(115,92,0,0.3)]">
              แผนที่แห่งชะตากรรม
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-secondary border-opacity-40"></div>
              <p className="font-label text-on-surface-variant italic text-lg max-w-xl">
                เปิดเผยความสอดคล้องประสานกันของโหงวเฮ้งบนใบหน้าคุณ
              </p>
              <div className="h-[1px] w-12 bg-secondary border-opacity-40"></div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {zones.map((zone) => {
            const highlight = getPrimaryResult(zone.data);
            return (
              <div key={zone.id} className="relative group">
                <div className="bg-surface-container-high parchment-texture p-8 ornate-border min-h-[350px] flex flex-col justify-between hover:translate-y-[-8px] transition-transform duration-500">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                    <span className="material-symbols-outlined text-6xl">
                      {zone.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`material-symbols-outlined ${zone.colorClass}`}>
                        {zone.icon}
                      </span>
                      <h3 className="font-headline text-xl font-bold text-primary">
                        {zone.title}
                      </h3>
                    </div>
                    <div className="text-on-surface-variant leading-relaxed space-y-4">
                       <p className="font-bold flex items-center gap-2 text-base border-b border-secondary border-opacity-20 pb-2">
                         {highlight.icon} {highlight.titleTh}
                       </p>
                       <ul className="text-sm space-y-3">
                         {zone.data.results.map((r: MetricResult, idx: number) => (
                           <li key={idx} className="flex gap-2">
                             <span>{r.icon}</span>
                             <span>{r.titleTh}: <span className="text-xs opacity-70 block">{r.descEn}</span></span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-secondary border-opacity-10 flex justify-between items-center">
                    <span className="font-label text-xs uppercase tracking-widest text-secondary">
                      คะแนนส่วนนี้: {zone.data.score}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-sm">
                      token
                    </span>
                  </div>
                </div>
                <div className="absolute -top-2 left-8 w-[2px] h-6 bg-primary"></div>
              </div>
            );
          })}
        </section>

        <section className="mt-32 max-w-4xl mx-auto text-center px-6">
          <div className="relative py-16 px-12 border-4 border-secondary border-opacity-20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 bg-background">
              <span className="material-symbols-outlined text-primary text-4xl">
                history_edu
              </span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">
              มุ่งหน้าสู่โถงแห่งเสียงสะท้อน
            </h2>
            <p className="font-label text-on-surface-variant text-sm tracking-widest uppercase mb-10">
              เส้นทางของคุณถูกชี้วัดแล้ว แต่ชะตาชีวิตยังคงอยู่ในมือของคุณ ค้นพบคำพยากรณ์ล่วงหน้า 10 ปี
            </p>
            <Button className="mx-auto" onClick={() => router.push('/forecast')}>ดูคำพยากรณ์ความมั่งคั่ง</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
