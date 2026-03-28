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
      "ดวงตายาวรี": "ดวงตายาวรีบ่งบอกถึงสติปัญญาเฉียบแหลม วิสัยทัศน์กว้างไกล มีความสามารถในการรักษาความสัมพันธ์ระยะยาวได้เป็นอย่างดีเยี่ยม มักจะได้รับการอุปถัมภ์จากผู้หลักผู้ใหญ่หรือเบื้องบนอยู่เสมอ กอปรด้วยเมตตาธรรมและความรอบคอบ",
      "ดวงตาพอดี": "ดวงตาได้สัดส่วนสะท้อนถึงสภาวะอารมณ์ที่มั่นคง สามารถจัดการกับอุปสรรคและแรงกดดันในชีวิตได้อย่างมีสติรอบคอบ ไม่หวั่นไหวต่อสิ่งเร้าง่ายๆ มีความยุติธรรมเป็นที่ตั้งและเปี่ยมด้วยคุณธรรม",
      "ตาห่างพอดี": "ระยะห่างของดวงตาที่สมดุลชี้ให้เห็นถึงความใจกว้าง ซื่อสัตย์ และเป็นที่น่าเชื่อถือในสายตาของผู้ร่วมงาน ส่งผลดีต่อหน้าที่การงานที่ต้องอาศัยความร่วมมือและมิตรภาพอันยั่งยืน",
      "ตาสมมาตร": "ความสมมาตรแห่งดวงตาคือสัญลักษณ์ของชีวิตที่สมดุล นำมาซึ่งความสำเร็จที่ยั่งยืนและความสงบสุขในจิตใจ จิตใจที่มั่นคงจะดึงดูดโชคลาภเกื้อหนุนให้ราบรื่นทุกก้าวย่าง",
      "หว่างคิ้วกว้าง": "พื้นที่ระหว่างคิ้วที่กว้างขวางเปิดรับพลังงานบวก (ชี่) บ่งบอกถึงความปรีชาญาณ ความใจกว้าง และศักยภาพในการเป็นผู้นำที่อดทน สามารถรับมือกับวิกฤตการณ์ได้ด้วยความสุขุม",
      "ตาเล็ก/สั้น": "แม้ดวงตาจะเล็กแต่สะท้อนถึงความละเอียดรอบคอบ ช่างสังเกต และมีความพากเพียรสูง หากใช้สติปัญญาควบคู่ไปจะเป็นผู้ที่มีโอกาสประสบความสำเร็จจากความเพียรของตน",
      "ตาชิดกัน": "ดวงตาที่ค่อนข้างชิดสะท้อนถึงความมุ่งมั่นจดจ่อในสิ่งใดสิ่งหนึ่งอย่างแท้จริง เป็นผู้ที่มีสมาธิสูงและสามารถทำงานที่ต้องการความลึกซึ้งได้ดีเยี่ยม",
      "ตาไม่เท่ากัน": "ความไม่เท่ากันของดวงตาสะท้อนถึงการเดินทางของชีวิตที่มีสีสันและบทเรียนหลากหลาย ช่วงชีวิตจะมีช่วงที่ก้าวกระโดดอย่างรวดเร็วจากการเรียนรู้ประสบการณ์",
      "คิ้วต่ำชิดตา": "คิ้วที่ค่อนข้างชิดตาบ่งบอกถึงความรวดเร็วในการตัดสินใจ กระฉับกระเฉง และมีพลังในการขับเคลื่อนงานสูง หากเพิ่มความใจเย็นจะนำมาซึ่งความสำเร็จที่ยิ่งใหญ่",

      // Nose (Treasury)
      "สันจมูกตรง": "สันจมูกที่ทอดยาวตรงอย่างสง่างาม บ่งบอกถึงความสามารถในการตัดสินใจที่เด็ดขาด มีภาวะผู้นำสูง และจะสามารถรักษาทรัพย์สินที่หามาได้อย่างมั่งคั่ง มั่นคงดั่งขุนเขาทองคำ",
      "ปลายจมูกไม่เชิด": "โชคชะตาด้านการเงินแข็งแกร่ง มีพรสวรรค์ในการเก็บออมและบริหารจัดการทรัพย์สิน ท้องพระคลังของคุณจะพอกพูนขึ้นเรื่อยๆ ไปตลอดชีวิต แซ่ซ้องด้วยกลิ่นอายแห่งความรุ่งเรือง",
      "ปีกจมูกสมดุล": "ความสมดุลของปีกจมูกสะท้อนถึงกระแสการเงินที่ไหลเวียนอย่างราบรื่น สุขภาพแข็งแรง และมักจะมีผู้ช่วยเหลือสนับสนุนด้านการลงทุนเมื่อถึงคราวจำเป็น มีมิตรสหายที่ดีคอยเกื้อกูล",
      "ปลายจมูกเชิดเล็กน้อย": "แม้จะมีรสนิยมที่ดีและใช้จ่ายเก่งตามอัธยาศัย แต่ด้วยปฏิภาณไหวพริบ คุณมีความสามารถในการหาเงินเข้ามาหมุนเวียนและทดแทนได้อย่างต่อเนื่อง ไม่ขาดมือ",
      "จมูกได้สัดส่วน": "ความยาวของจมูกที่ได้สัดส่วนสะท้อนถึงวิถีชีวิตที่ราบรื่นในช่วงวัยทำงาน (35-50 ปี) จะได้พบกับความสำเร็จที่ก้าวหน้าอย่างมั่นคงและสง่างาม",
      "สันจมูกคด": "ความไม่ราบเรียบของสันจมูกสะท้อนถึงบทเรียนชีวิตที่ต้องฝ่าฟัน การแก้ไขปัญหาด้วยไหวพริบจะทำให้คุณกลายเป็นผู้ที่มีบารมีสูงขึ้นจากการชนะอุปสรรค",
      "ปลายจมูกเชิด": "จมูกที่เชิดบ่งบอกถึงความเป็นคนเปิดเผย ใจกว้าง มีรื่นรมย์ในชีวิต มักจะได้โชคลาภจากมิตรสหายและการสังคมที่ยอดเยี่ยม",
      "ปีกจมูกกว้าง": "ปีกจมูกที่กว้างหมายถึงความทะเยอทะยานที่ทรงพลัง มีความกล้าหาญในการลงทุนขยายกิจการ และสามารถดึงดูดโอกาสทางการเงินขนาดใหญ่เข้ามาสู่ตน",
      "จมูกสั้น/ยาว": "ความยาวที่ไม่เป็นไปตามพิมพ์นิยมไม่ได้หมายถึงอุปสรรค แต่หมายถึงเอกลักษณ์ในการสร้างตัวที่แตกต่าง จะประสบความสำเร็จในแบบฉบับของตัวเองที่ไม่เหมือนใคร",

      // Mouth (Mouth Palace - วังมหาทรัพย์)
      "ปากกว้างพอดี": "ริมฝีปากที่ได้สัดส่วนสวยงามคือสัญลักษณ์ของการมีวาทศิลป์ที่ดีเยี่ยม พูดจาน่าเชื่อถือ ดึงดูดทรัพย์และโชคลาภจากการเจรจา ประสบความสำเร็จอย่างสูงในช่วงวัย 50-65 ปี",
      "ปากไม่เบี้ยว": "ความสมมาตรของปากสะท้อนถึงความซื่อสัตย์สุจริต คำพูดมีน้ำหนักและเปี่ยมด้วยพลัง เป็นที่เคารพนับถือของคนรอบข้างและบริวาร มีสัจจะวาจาเป็นเลิศ",
      "ปิดปากสนิท": "การปิดปากที่มิดชิดสะท้อนถึงความเป็นผู้รักษาความลับและเก็บออมทรัพย์สินได้ดีเยี่ยม มีความอดทนอดกลั้นและสามารถบริหารจัดการชีวิตได้อย่างเป็นระบบระเบียบ",
      "ริมฝีปากสมดุล": "สัดส่วนบน-ล่างที่พอเหมาะบ่งบอกถึงชีวิตที่สุขสบายในยามเกษียณ จะอบอวลไปด้วยความรักและความเข้าใจจากคนในครอบครัว มรดกทางทรัพย์และปัญญาจะยั่งยืน",
      "ปากกว้างมาก": "ปากที่กว้างบ่งบอกถึงอิทธิพลทางสังคมที่กว้างขวาง มีเพื่อนฝูงรอบกายมากมาย และมีความสามารถในการเจรจาต่อรองในระดับสูง",
      "ปากแหลม/แคบ": "ปากที่เล็กแสดงถึงความละเอียดวิจิตรในการใช้คำพูด เป็นคนช่างเลือกและมีรสนิยมสูง จะประสบความสำเร็จในงานที่ต้องใช้ความประณีตและการเจรจาที่คมคาย",
      "ปากเบี้ยว": "ความไม่สมมาตรสะท้อนถึงไหวพริบปฏิภาณในการพลิกแพลงสถานการณ์ หากใช้คำพูดย่างมีสติจะเป็นผู้ที่สามารถโน้มน้าวใจคนได้อย่างเหนือชั้น",
      "ปากอ้าเล็กน้อย": "บ่งบอกถึงความเป็นคนคุยเก่ง เข้าสังคมง่าย และเป็นที่รักในหมู่เพื่อนฝูงด้วยความเป็นกันเองและมุกตลกที่น่ารื่นรมย์",
      "ริมฝีปากไม่สมดุล": "สะท้อนถึงลักษณะเฉพาะของวาทศิลป์ที่มีพลัง แฝงด้วยความคิดสร้างสรรค์ที่ไม่เหมือนใครในบทสนทนา",

      // Jaw/Faces (Subordinates)
      "คางอิ่มเต็ม": "คางที่หนาและอิ่มเต็มคือเอกลักษณ์ของผู้มีบุญบารมี บ่งบอกถึงความสุขสบายอย่างแท้จริงในช่วงบั้นปลายชีวิต และจะแวดล้อมไปด้วยบริวาร ลูกหลาน ที่ซื่อสัตย์คอยเกื้อหนุนอย่างอบอุ่น",
      "วังทั้ง 3 สมดุล": "ใบหน้าที่สัดส่วนวังทั้งสาม (ฟ้า มนุษย์ ดิน) สมดุลกันอย่างสมบูรณ์แบบ ถือเป็นสุดยอดแห่งโหงวเฮ้ง ชีวิตจะดำเนินไปอย่างราบรื่น ประสบความสำเร็จทั้งปัญญา โชคลาภ และบั้นปลายที่สุขสมบูรณ์ดั่งวิหารทองคำ",
      "วังมนุษย์โดดเด่น": "ความโดดเด่นในวังมนุษย์ (ช่วงกลางใบหน้า) จะส่งผลให้คุณสามารถสร้างเนื้อสร้างตัวและเจริญรุ่งเรืองถึงขีดสุดเมื่อก้าวเข้าสู่วัย 40 ปีขึ้นไป เป็นยุคทองแห่งความก้าวหน้า",
      "หน้าไข่": "รูปหน้าทรงไข่สะท้อนถึงบุคลิกภาพที่มีเสน่ห์ดึงดูดใจ มีความยืดหยุ่นสูง สามารถปรับตัวเข้ากับทุกสถานการณ์และเป็นที่รักของผู้คนรอบข้างเสมอ เป็นที่เมตตาจากทุกคน",
      "หน้าสี่เหลี่ยม": "โครงหน้าที่แข็งแกร่งดั่งหินผา บ่งบอกถึงความเป็นผู้นำโดยกำเนิด หนักแน่น อดทน และสามารถนำทัพฟันฝ่าอุปสรรคใหญ่หลวงจนบรรลุเป้าหมายได้อย่างสง่างามและมั่นคง",
      "หน้าสามเหลี่ยม": "รูปหน้าสามเหลี่ยมสะท้อนถึงความฉลาดปราดเปรื่อง มีความคิดสร้างสรรค์ที่ล้ำลึก หากเพิ่มการสร้างความสัมพันธ์กับคนรอบข้างจะเป็นผู้ที่ไร้ขีดจำกัดทางปัญญา",
      "หน้ากลม": "โครงหน้าที่กลมมนสื่อถึงความมีน้ำใจ ใจดี มีเมตตา อารมณ์เบิกบาน มักจะมีโชคทางด้านการได้รับการอุปถัมภ์และการช่วยเหลือจากผู้อื่นอยู่เสมอ",
      "วังฟ้าโดดเด่น": "ความโดดเด่นของหน้าผากสะท้อนถึงต้นทุนทางสติปัญญาที่เป็นเลิศ มักได้ดิบได้ดีตั้งแต่เยาว์วัยเพราะความคิดที่เกินอายุ",
      "วังดินโดดเด่น": "ความโดดเด่นของช่วงคางบ่งบอกถึงฐานรากของชีวิตที่มั่นคงขึ้นเรื่อยๆ ตามกาลเวลา บั้นปลายจะเป็นช่วงที่ชีวิตมีความเสถียรที่สุด",
      "คางแหลม/เล็ก": "สะท้อนถึงความคล่องตัวและการตัดสินใจที่ว่องไว มีความสามารถในการปรับเปลี่ยนแผนได้อย่างรวดเร็วเพื่อรักษาผลประโยชน์ของตนและบริวาร",
    };
    return detailsMap[title] || defaultDesc;
  };

  const getBarData = () => {
    if (!report) {
      return [
        { age: 10, height: 20 },
        { age: 20, height: 35 },
        { age: 30, height: 55 },
        { age: 40, height: 45 },
        { age: 50, height: 70 },
        { age: 60, height: 95, peak: true },
        { age: 70, height: 80 },
        { age: 80, height: 65 },
      ];
    }

    // Mapping logic based on Ngow Heng zones
    // Ages 10-30: Sky Palace (Eyes/Forehead)
    const sEyes = (report.eyes.score / 6) * 100;
    // Ages 40-50: Human Palace (Nose/Middle Face)
    const sNose = (report.nose.score / 7) * 100;
    // Ages 60-80: Earth Palace (Jaw/Mouth/Lower Face)
    const sLower = ((report.mouth.score + report.jaw.score) / 13) * 100;

    const data = [
      { age: 10, height: Math.max(15, sEyes * 0.4) },
      { age: 20, height: Math.max(20, sEyes * 0.7) },
      { age: 30, height: Math.max(25, sEyes * 1.0) },
      { age: 40, height: Math.max(30, sNose * 0.9) },
      { age: 50, height: Math.max(35, sNose * 1.1) },
      { age: 60, height: Math.max(40, sLower * 1.2) },
      { age: 70, height: Math.max(30, sLower * 1.0) },
      { age: 80, height: Math.max(20, sLower * 0.8) },
    ];

    // Identify Peak
    let peakIdx = 0;
    let maxH = 0;
    data.forEach((d, i) => {
      // Give slight preference to middle-late age (50-60) if scores are similar
      const bonus = (d.age >= 50 && d.age <= 60) ? 2 : 0;
      if (d.height + bonus > maxH) {
        maxH = d.height + bonus;
        peakIdx = i;
      }
    });

    return data.map((d, i) => ({
      ...d,
      height: Math.min(Math.round(d.height), 98),
      peak: i === peakIdx
    }));
  };

  const barData = getBarData();

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
                {barData.map((bar) => (
                  <div key={bar.age} className="group relative flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className={`w-full transition-all duration-500 relative ${
                        bar.peak
                          ? "border border-secondary shadow-lg group-hover:scale-105 z-20"
                          : "bg-gradient-to-b from-[#574500] to-[#735c00] border-l border-[#fed65b] border-r border-[#241a00] opacity-80 group-hover:opacity-100 group-hover:h-[var(--hover-h)] z-10"
                      }`}
                      style={{
                        height: `${bar.height}%`,
                        ...(bar.peak
                          ? {
                              backgroundColor: "#8f0402",
                              backgroundImage: "radial-gradient(circle at center, #b22417 0%, #8f0402 100%)",
                              boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.3)",
                            }
                          : {}),
                        // Since Tailwind doesn't support dynamic group-hover heights easily, 
                        // we use a CSS variable for the hover state if not peak
                        ...( !bar.peak ? { "--hover-h": `${Math.min(bar.height + 5, 100)}%` } : {} )
                      } as any}
                    >
                      {bar.peak && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary-fixed px-2 py-0.5 text-[8px] font-bold uppercase whitespace-nowrap shadow-sm animate-bounce">
                          จุดสูงสุด
                        </div>
                      )}
                    </div>
                    <span className={`font-label text-[10px] ${bar.peak ? "font-bold text-primary" : "text-on-surface-variant"}`}>
                      {bar.age}
                    </span>
                  </div>
                ))}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary leading-tight min-h-[64px] flex items-center justify-center">
                คฤหาสน์สวรรค์ (ทัศนคติ)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[120px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center text-primary-container group-hover:text-secondary-fixed">
                      {getVerdict(report.eyes, "ปัญญาญาณ", "👁️").titleTh}
                    </p>
                    <p>{expandDetail(getVerdict(report.eyes, "", "").titleTh, getVerdict(report.eyes, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4 opacity-70 italic">ตั้งอยู่บริเวณหน้าผากและดวงตา พื้นที่แห่งสติปัญญาและการมองการณ์ไกล บ่งบอกถึงฐานรากแห่งความคิดและการปกป้องจากสวรรค์</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-secondary-fixed border-opacity-10">
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
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary leading-tight min-h-[64px] flex items-center justify-center">
                ท้องพระคลัง (การเงิน)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[120px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center text-primary-container group-hover:text-secondary-fixed">
                      {getVerdict(report.nose, "ฐานะการเงิน", "👃").titleTh}
                    </p>
                    <p>{expandDetail(getVerdict(report.nose, "", "").titleTh, getVerdict(report.nose, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4 opacity-70 italic">จมูกคือศูนย์กลางแห่งโชคลาภ จมูกที่มีเนื้ออิ่มเอิบและสันจมูกที่แข็งแกร่งบ่งบอกถึงความสามารถในการรักษาและพอกพูนทรัพย์สิน</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-secondary-fixed border-opacity-10">
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">
                  ระดับโชคลาภ: {getPercentage(report?.nose, "95%")}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-high p-10 space-y-6 text-center group hover:-translate-y-2 hover:bg-[#8f0402] transition-all duration-500 cursor-default border border-secondary border-opacity-5 shadow-lg hover:shadow-2xl">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white flex items-center justify-center border-2 border-secondary border-opacity-40 group-hover:border-opacity-100 transition-all">
                  <span className="material-symbols-outlined text-5xl text-primary group-hover:text-secondary-fixed">
                    currency_exchange
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary flex items-center justify-center transform rotate-12 shadow-md">
                  <span className="text-on-secondary-fixed font-bold text-[10px]">
                    III
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary leading-tight min-h-[64px] flex items-center justify-center">
                วังมหาทรัพย์ (วาทศิลป์)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[120px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center text-primary-container group-hover:text-secondary-fixed">
                      {getVerdict(report.mouth, "การเจรจา", "👄").titleTh}
                    </p>
                    <p>{expandDetail(getVerdict(report.mouth, "", "").titleTh, getVerdict(report.mouth, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4 opacity-70 italic">ปากคือประตูแห่งทรัพย์ผ่านคำพูดและการติดต่อสื่อสาร ปากที่ได้สัดส่วนบ่งบอกถึงชีวิตที่ไม่มีวันอดอยากและมีเพื่อนฝูงมากมาย</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-secondary-fixed border-opacity-10">
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">
                  ดัชนีรวยล้น: {getPercentage(report?.mouth, "92%")}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-high p-10 space-y-6 text-center group hover:-translate-y-2 hover:bg-[#8f0402] transition-all duration-500 cursor-default border border-secondary border-opacity-5 shadow-lg hover:shadow-2xl">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white flex items-center justify-center border-2 border-secondary border-opacity-40 group-hover:border-opacity-100 transition-all">
                  <span className="material-symbols-outlined text-5xl text-primary group-hover:text-secondary-fixed">
                    partner_exchange
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary flex items-center justify-center transform rotate-12 shadow-md">
                  <span className="text-on-secondary-fixed font-bold text-[10px]">
                    IV
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-on-primary leading-tight min-h-[64px] flex items-center justify-center">
                วังบริวาร (อำนาจ)
              </h3>
              <div className="font-body text-sm leading-relaxed text-on-surface-variant group-hover:text-surface-container-low min-h-[120px] text-left">
                {report ? (
                  <>
                    <p className="font-bold mb-2 text-center text-primary-container group-hover:text-secondary-fixed">
                      {getVerdict(report.jaw, "บารมี", "👤").titleTh}
                    </p>
                    <p>{expandDetail(getVerdict(report.jaw, "", "").titleTh, getVerdict(report.jaw, "", "").descEn || "")}</p>
                  </>
                ) : (
                  <p className="text-center mt-4 opacity-70 italic">โครงหน้าและคางสะท้อนถึงบริวารและอำนาจการปกครอง คางที่อิ่มเต็มคือกุญแจสู่บั้นปลายชีวิตที่มีความสุขและแวดล้อมด้วยคนที่รัก</p>
                )}
              </div>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-secondary-fixed border-opacity-10">
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
