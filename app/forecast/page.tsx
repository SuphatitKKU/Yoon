"use client";

import React from "react";
import Link from "next/link";
import { useAnalysis } from "@/context/AnalysisContext";
import { ZoneAnalysis, MetricResult } from "@/utils/ngowHengAnalyzer";

export default function ForecastPage() {
  const { report } = useAnalysis();

  // Helper to extract a relevant message from the context results
  const getVerdict = (zone: ZoneAnalysis | undefined, fallback: string, iconFallback: string): { titleTh: string, icon: string, descEn?: string } => {
    if (!zone || !zone.results || zone.results.length === 0) return { titleTh: fallback, icon: iconFallback, descEn: "" };
    // Prefer a warning/error message to give depth, otherwise take the first
    const msg = zone.results.find((r: MetricResult) => r.icon === "⚠️" || r.icon === "❌") || zone.results[0];
    return msg;
  };

  const getPercentage = (zone: ZoneAnalysis | undefined, fallback: string) => {
     if (!zone) return fallback;
     // simple heuristic score out of max possible per section to percentage
     const percentage = Math.round((zone.score / 5) * 100); 
     return `${Math.min(percentage, 99)}%`;
  };

  const expandDetail = (title: string, defaultDesc: string) => {
    const detailsMap: Record<string, string> = {
      // Eyes (Sky Palace)
      "ดวงตายาวรี": "ดวงตายาวรีบ่งบอกถึงสติปัญญาเฉียบแหลม วิสัยทัศน์กว้างไกล มีความสามารถในการรักษาความสัมพันธ์ระยะยาวได้เป็นอย่างดีเยี่ยม มักจะได้รับการอุปถัมภ์จากผู้หลักผู้ใหญ่หรือเบื้องบนอยู่เสมอ",
      "ดวงตาพอดี": "ดวงตาได้สัดส่วนสะท้อนถึงสภาวะอารมณ์ที่มั่นคง สามารถจัดการกับอุปสรรคและแรงกดดันในชีวิตได้อย่างมีสติรอบคอบ ไม่หวั่นไหวต่อสิ่งเร้าง่ายๆ",
      "ตาห่างพอดี": "ระยะห่างของดวงตาที่สมดุลชี้ให้เห็นถึงความใจกว้าง ซื่อสัตย์ และเป็นที่น่าเชื่อถือในสายตาของผู้ร่วมงาน ส่งผลดีต่อหน้าที่การงาน",
      "ตาสมมาตร": "ความสมมาตรแห่งดวงตาคือสัญลักษณ์ของชีวิตที่สมดุล นำมาซึ่งความสำเร็จที่ยั่งยืนและความสงบสุขในจิตใจ",
      "หว่างคิ้วกว้าง": "พื้นที่ระหว่างคิ้วที่กว้างขวางเปิดรับพลังงานบวก บ่งบอกถึงความปรีชาญาณ ความใจกว้าง และศักยภาพในการเป็นผู้นำที่อดทน",
      
      // Nose (Treasury)
      "สันจมูกตรง": "สันจมูกที่ทอดยาวตรงอย่างสง่างาม บ่งบอกถึงความสามารถในการตัดสินใจที่เด็ดขาด มีภาวะผู้นำสูง และจะสามารถรักษาทรัพย์สินที่หามาได้อย่างมั่งคั่ง",
      "ปลายจมูกไม่เชิด": "โชคชะตาด้านการเงินแข็งแกร่ง มีพรสวรรค์ในการเก็บออมและบริหารจัดการทรัพย์สิน ท้องพระคลังของคุณจะพอกพูนขึ้นเรื่อยๆ ไปตลอดชีวิต",
      "ปีกจมูกสมดุล": "ความสมดุลของปีกจมูกสะท้อนถึงกระแสการเงินที่ไหลเวียนอย่างราบรื่น สุขภาพแข็งแรง และมักจะมีผู้ช่วยเหลือสนับสนุนด้านการลงทุนเมื่อถึงคราวจำเป็น",
      "ปลายจมูกเชิดเล็กน้อย": "แม้จะมีรสนิยมที่ดีและใช้จ่ายเก่ง แต่ด้วยปฏิภาณไหวพริบ คุณมีความสามารถในการหาเงินเข้ามาหมุนเวียนและทดแทนได้อย่างต่อเนื่อง",
      
      // Jaw/Faces (Subordinates)
      "คางอิ่มเต็ม": "คางที่หนาและอิ่มเต็มคือเอกลักษณ์ของผู้มีบุญบารมี บ่งบอกถึงความสุขสบายอย่างแท้จริงในช่วงบั้นปลายชีวิต และจะแวดล้อมไปด้วยบริวาร ลูกหลาน ที่ซื่อสัตย์คอยเกื้อหนุน",
      "วังทั้ง 3 สมดุล": "ใบหน้าที่สัดส่วนวังทั้งสาม (ฟ้า มนุษย์ ดิน) สมดุลกันอย่างสมบูรณ์แบบ ถือเป็นสุดยอดแห่งโหงวเฮ้ง ชีวิตจะดำเนินไปอย่างราบรื่น ประสบความสำเร็จทั้งปัญญา โชคลาภ และบั้นปลายที่สุขสมบูรณ์",
      "วังมนุษย์โดดเด่น": "ความโดดเด่นในวังมนุษย์ (ช่วงกลางใบหน้า) จะส่งผลให้คุณสามารถสร้างเนื้อสร้างตัวและเจริญรุ่งเรืองถึงขีดสุดเมื่อก้าวเข้าสู่วัย 40 ปีขึ้นไป",
      "หน้าไข่": "รูปหน้าทรงไข่สะท้อนถึงบุคลิกภาพที่มีเสน่ห์ดึงดูดใจ มีความยืดหยุ่นสูง สามารถปรับตัวเข้ากับทุกสถานการณ์และเป็นที่รักของผู้คนรอบข้างเสมอ",
      "หน้าสี่เหลี่ยม": "โครงหน้าที่แข็งแกร่งดั่งหินผา บ่งบอกถึงความเป็นผู้นำโดยกำเนิด หนักแน่น อดทน และสามารถนำทัพฟันฝ่าอุปสรรคใหญ่หลวงจนบรรลุเป้าหมายได้อย่างสง่างาม",
    };
    return detailsMap[title] || defaultDesc;
  };

  return (
    <div className="bg-surface text-on-surface flex-1 w-full relative parchment-texture">
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(143, 4, 2, 0.02) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(143, 4, 2, 0.02) 0%, transparent 50%)",
        }}
      ></div>
      <div className="fixed top-[-50px] right-[-50px] w-[400px] h-[400px] opacity-5 pointer-events-none z-[1] bg-no-repeat bg-contain shadow-[0_0_100px_black] rounded-full filter blur-[20px]"></div>
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] opacity-5 pointer-events-none z-[1] bg-no-repeat bg-contain shadow-[0_0_100px_black] rounded-full filter blur-[25px]"></div>

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-16">
        <section className="relative">
          <div className="bg-black/5 p-1 lg:p-1.5 shadow-2xl overflow-hidden relative">
            <div
              className="absolute inset-0 z-[-1]"
              style={{
                backgroundColor: "#8f0402",
                backgroundImage:
                  "radial-gradient(circle at center, #b22417 0%, #8f0402 100%)",
                boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.3)",
              }}
            ></div>
            <div className="border-[1px] border-secondary-fixed border-opacity-30 p-8 lg:p-14 relative bg-black bg-opacity-5">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-secondary"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-secondary"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-secondary"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-secondary"></div>

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                   <h4 className="font-label text-secondary-fixed uppercase tracking-[0.3em] text-sm font-medium">
                     คำทำนายจากสรวงสวรรค์
                   </h4>
                   <h1 className="text-5xl lg:text-7xl font-bold text-on-primary font-headline leading-tight">
                     <span className="text-secondary-fixed inline-block align-middle mr-2">
                       ✦
                     </span>{" "}
                     พยากรณ์ความมั่งคั่ง
                   </h1>
                   <p className="text-on-primary-container text-lg lg:text-xl font-body leading-relaxed max-w-lg opacity-90">
                     เส้นทางสู่ความมั่งคั่งของคุณถูกสลักไว้ในการบรรจบกันของมังกรไม้และพื้นผิวใบหน้าของคุณ ภูเขาแห่งจมูกบ่งชี้ถึงจุดสูงสุดของการสะสมความมั่งคั่งในช่วงวัยทองของคุณ
                   </p>
                   {!report && (
                     <div className="pt-4 flex gap-4">
                       <Link href="/analysis">
                         <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-3 group border border-secondary border-opacity-20 shadow-xl hover:shadow-[0_4px_20px_rgba(143,4,2,0.2)] transition-all">
                           <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                           เริ่มสแกนใบหน้าเพื่อดูคำทำนาย
                           <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                         </button>
                       </Link>
                     </div>
                   )}
                </div>

                <div className="relative group">
                  <div className="aspect-square bg-white bg-opacity-5 backdrop-blur-xl border border-secondary-fixed border-opacity-20 p-4 relative shadow-2xl">
                    <img
                      alt="Imperial Scroll"
                      className="w-full h-full object-cover grayscale brightness-75 mix-blend-overlay opacity-80"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr7hntQcm6CoZISRmuFOeZ-emuWh-ZEoQEMvIHBA95dj8AsJm575zMZqV9wXCmoZBcnMyhm9r3p8FEPYr_CDmchmHwiJ7YCjMtytzQknSy2nxdebbz2RZU9pB_da362pRhkawVABm4SS04ZbBvryA9HfqqXFgKEff1c_z9zuFMxpzfHpcdgzN2xjJla_wC-x986lDFn9rGrbuSDmakLcJGnK65tzJ7SagLLru-dMS7D9c9uLl3cbkwYmJjxI9GFyRCLUkagyegIK0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 border-2 border-secondary border-opacity-40 rotate-45 flex items-center justify-center">
                        <div className="w-48 h-48 border border-secondary border-opacity-20 -rotate-45 bg-on-background bg-opacity-20 backdrop-blur-md flex flex-col items-center justify-center text-secondary-fixed">
                          <span
                            className="material-symbols-outlined text-5xl mb-2"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            generating_tokens
                          </span>
                          <span className="font-label text-xs uppercase tracking-tighter text-center px-4">
                            {report ? `คะแนนสวรรค์: ${report.totalScore}/24` : 'แก่นแท้ทองคำ: ว่างเปล่า'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold font-headline text-primary">
              ลำดับเวลาช่วงชีวิต
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="bg-surface-container-low p-6 lg:p-8 relative border border-secondary border-opacity-15 shadow-md overflow-hidden">
            <div
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M200 0 L250 50 M150 50 L200 0 M50 150 L0 200 M0 200 L50 250 M350 150 L400 200 M400 200 L350 250 M150 350 L200 400 M200 400 L250 350' stroke='%23735c00' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")",
              }}
            ></div>
            <div className="relative z-10">
              <div className="grid grid-cols-8 gap-1 md:gap-3 items-end h-48 border-b border-primary border-opacity-20">
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[20%] group-hover:h-[25%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant">10</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[35%] group-hover:h-[40%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant">20</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[55%] group-hover:h-[60%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant">30</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[45%] group-hover:h-[50%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant">40</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[70%] group-hover:h-[75%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant font-bold text-primary">50</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    className="w-full border border-secondary shadow-lg transition-all duration-500 h-[95%] group-hover:scale-105 relative"
                    style={{
                      backgroundColor: "#8f0402",
                      backgroundImage: "radial-gradient(circle at center, #b22417 0%, #8f0402 100%)",
                      boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary-fixed px-2 py-0.5 text-[8px] font-bold uppercase whitespace-nowrap shadow-sm">
                      จุดสูงสุด
                    </div>
                  </div>
                  <span className="font-label text-[10px] text-on-surface-variant font-bold text-primary">60</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[80%] group-hover:h-[85%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant">70</span>
                </div>
                <div className="group relative flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] transition-all duration-500 h-[65%] group-hover:h-[70%] opacity-80 group-hover:opacity-100"></div>
                  <span className="font-label text-[10px] text-on-surface-variant">80</span>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3 p-4 border-l-2 border-secondary border-opacity-20 bg-white bg-opacity-40 shadow-sm">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-[9px] font-bold text-on-secondary-container">¥</div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    วัยเยาว์โดดเด่นด้วยการเติบโตอย่างมั่นคงในทุนทางสังคมและภูมิปัญญาที่สืบทอดมา
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 border-l-2 border-secondary border-opacity-20 bg-white bg-opacity-40 shadow-sm">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-[9px] font-bold text-on-secondary-container">¥</div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    จุดสูงสุดในช่วงวัย 50-60 ปี เป็นตัวแทนของการบรรจบกัน ซึ่งพลังชี่ภายในสอดคล้องกับความสำเร็จในโลกภายนอก
                  </p>
                </div>
                <div className="flex items-start gap-3 p-4 border-l-2 border-secondary border-opacity-20 bg-white bg-opacity-40 shadow-sm">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-[9px] font-bold text-on-secondary-container">¥</div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    ความมั่งคั่งในช่วงปลายชีวิตจะเปลี่ยนจากการแสวงหาทางวัตถุไปสู่มรดกที่ยั่งยืนแห่งจิตวิญญาณ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold font-headline text-primary">
              ข้อมูลเชิงลึกทางกายวิภาค (อิงจากใบหน้าคุณ)
            </h2>
            <p className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest leading-relaxed">
              หมายเหตุแห่งสวรรค์: การพยากรณ์นี้ถอดรหัสจากพลังงาน {report ? 'ใบหน้าของคุณ' : 'ตัวอย่าง'} โดยการกระทำและคุณธรรมจะนำพาไปสู่ชะตาที่แท้จริง
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-container-high p-10 space-y-6 text-center group hover:-translate-y-2 hover:bg-[#8f0402] transition-all duration-500 cursor-default border border-secondary border-opacity-5 shadow-lg hover:shadow-2xl">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white flex items-center justify-center border-2 border-secondary border-opacity-40 group-hover:border-opacity-100 transition-all">
                  <span className="material-symbols-outlined text-5xl text-primary group-hover:text-secondary-fixed">
                    temple_buddhist
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary flex items-center justify-center transform rotate-12 shadow-md">
                  <span className="text-on-secondary-fixed font-bold text-[10px]">
                    I
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary">
                คฤหาสน์สวรรค์ (ทัศนคติ)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[80px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center">{getVerdict(report.eyes, "ปัญญาญาณ", "👁️").titleTh}</p>
                    <p>{expandDetail(getVerdict(report.eyes, "", "").titleTh, getVerdict(report.eyes, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4">ตั้งอยู่บนหน้าผาก พื้นที่กว้างขวางบ่งบอกถึงการปกป้องจากเบื้องบนและความเจริญรุ่งเรือง</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">
                  อิทธิพลมงคล: {getPercentage(report?.eyes, "88%")}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-high p-10 space-y-6 text-center group hover:-translate-y-2 hover:bg-[#8f0402] transition-all duration-500 cursor-default border border-secondary border-opacity-5 shadow-lg hover:shadow-2xl">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white flex items-center justify-center border-2 border-secondary border-opacity-40 group-hover:border-opacity-100 transition-all">
                  <span className="material-symbols-outlined text-5xl text-primary group-hover:text-secondary-fixed">
                    savings
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary flex items-center justify-center transform rotate-12 shadow-md">
                  <span className="text-on-secondary-fixed font-bold text-[10px]">
                    II
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary">
                ท้องพระคลัง (การเงิน)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[80px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center">{getVerdict(report.nose, "ฐานะการเงิน", "👃").titleTh}</p>
                    <p>{expandDetail(getVerdict(report.nose, "", "").titleTh, getVerdict(report.nose, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4">ขอบเขตที่ชัดเจนและมีเนื้อสมบูรณ์บ่งบอกถึงความสามารถในการรักษาความมั่งคั่งเมื่อได้มา</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">
                  ระดับการเก็บเงิน: {getPercentage(report?.nose, "95%")}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-high p-10 space-y-6 text-center group hover:-translate-y-2 hover:bg-[#8f0402] transition-all duration-500 cursor-default border border-secondary border-opacity-5 shadow-lg hover:shadow-2xl">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white flex items-center justify-center border-2 border-secondary border-opacity-40 group-hover:border-opacity-100 transition-all">
                  <span className="material-symbols-outlined text-5xl text-primary group-hover:text-secondary-fixed">
                    groups_2
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary flex items-center justify-center transform rotate-12 shadow-md">
                  <span className="text-on-secondary-fixed font-bold text-[10px]">
                    III
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary">
                วังบริวาร (ผู้คนรอบข้าง)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[80px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center">{getVerdict(report.jaw, "เสน่ห์บารมี", "👤").titleTh}</p>
                    <p>{expandDetail(getVerdict(report.jaw, "", "").titleTh, getVerdict(report.jaw, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4">คางที่แข็งแรงและมีเนื้อสมบูรณ์เป็นตัวแทนของการสนับสนุนที่ซื่อสัตย์จากผู้ใต้บังคับบัญชา</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">
                  ดัชนีความภักดี: {getPercentage(report?.jaw, "90%")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
