import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-1 z-[60] bg-primary-container origin-left scale-x-0"
        id="progress-bar"
      ></div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-on-background py-20">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            className="w-full h-full object-cover"
            alt="abstract black and white ink wash painting with subtle gold splashes and dramatic fluid textures representing qi energy"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA_os7CFWzjHXy12tcqp9yO1PRATL7Fb_XW2NLcOAksWfbwzTOnsrEvZAUogs3-0cu39wJSPrdh4EEeRgfEq9SCGygm-EHvOQeeAmcDEvwAbAJM-sH1X8cI0vxI_EEE7Khe3czC86aHJCX-4nuurfHrfKVJwNU0MwATprCsw7rEYXDxrrdM9b9rdnn5N35mAWpvnO7XfThPwy9XyTJu9ewaR7ygUqA29M0e1wqDwgCGmXHLv8cjLDfO4NRLwL1yjLO0wrOUpnsrVk"
          />
        </div>

        <div className="absolute top-1/4 left-10 w-24 h-40 bg-secondary bg-opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-48 bg-primary bg-opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="mb-6 flex justify-center">
            <span
              className="text-secondary text-5xl material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold text-surface-bright mb-8 tracking-tighter leading-none">
            <span className="text-primary inline-block">ศาสตร์แห่ง</span> การอ่าน <br />
            <span className="relative">
              โหงวเฮ้ง
              <svg
                className="absolute -bottom-4 left-0 w-full h-4 text-secondary text-opacity-40"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 25 0 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
              </svg>
            </span>
          </h1>
          <p className="text-surface-variant max-w-2xl mx-auto text-xl mb-12 font-headline italic">
            ปลดล็อกชะตาชีวิตของคุณผ่านศาสตร์โบราณแห่งการทำนายลักษณะใบหน้า
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/analysis">
              <Button>
                เริ่มการสแกน
                <span className="material-symbols-outlined">center_focus_strong</span>
              </Button>
            </Link>
            <Link href="/forecast">
              <Button variant="secondary">ตรวจสอบสายเลือด</Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-[-5%] left-[-5%] w-1/3 pointer-events-none opacity-40">
          <img
            className="w-full h-full object-contain mix-blend-lighten"
            alt="A high-definition, detailed traditional Chinese ink-wash (Sumi-e) illustration"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArI6vV5U0oFk0_K67n7wzQ4wYp8_Rz_Y8_N0_S0_T0_U0_V0_W0_X0_Y0_Z0_a0_b0_c0_d0_e0_f0_g0_h0_i0_j0_k0_l0_m0_n0_o0_p0_q0_r0_s0_t0_u0_v0_w0_x0_y0_z0_10_20_30_40_50_60_70_80_90"
          />
        </div>
      </section>

      <section className="py-24 silk-texture relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="p-4 border-2 border-secondary border-opacity-20 relative">
                <img
                  className="w-full h-[600px] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
                  alt="A traditional Chinese landscape painting of a majestic mountain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3ffAD-eEnGoljwpsq44gLaylCEo8Joii3LQcUBfU-VPOSwYiSU60U3KU57V7WUtDXvnjGQzi6mjFD7yOuqwLvLaMPP0YjhFeTUUfMjmihvNvKPjXBuExi12bTqkbl-Xe5XzYtg1f3YsBdAj4_BOFzFhnnz2eSr9AQ_U8kEZonLyTaKFmk5JXGGukwlpKWMlpcYwogTH-5tFJ5EVnEZfNn50iBK85W7gnvNtm6-Lblx0_k7GCMDRPxZFp8riOTIS3rU8Ajp70HGpM"
                />
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-secondary -translate-x-2 -translate-y-2"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-secondary translate-x-2 translate-y-2"></div>
              </div>
              <div className="absolute top-1/2 -right-6 w-12 h-12 bg-secondary rounded-full blur-2xl opacity-40"></div>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-secondary"></div>
                <span className="text-secondary font-label uppercase tracking-[0.3em]">
                  มรดกแห่งจักรพรรดิ
                </span>
              </div>
              <h2 className="text-5xl font-bold text-primary leading-tight">
                <span className="text-7xl">ต้</span>นกำเนิดแห่ง <br />
                ศาสตร์โหงวเฮ้ง
              </h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
                <p>
                  เป็นเวลากว่าพันปีที่ราชเลขาธิการได้เฝ้าสังเกตการไหลเวียนของพลังชี่ทั่วทั้งผืนหน้า โหงวเฮ้งไม่ใช่เพียงแง่มุมของการทำนายทายทักเท่านั้น แต่คือการวิเคราะห์เชิงเรขาคณิตของลักษณะนิสัยและโชคชะตาผ่านห้าภูเขาและสี่สายน้ำบนใบหน้า
                </p>
                <p>
                  ทุกรอยหยัก ทุกเงา และทุกโครงกระดูก ล้วนบอกเล่าเรื่องราวของศักยภาพและวิถีแห่งกรรมที่สืบทอดมา ซึ่งได้สลักไว้บนผืนแผ่นใบบัญชีแห่งชีวิต นั่นก็คือใบหน้าของมนุษย์
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="p-6 bg-surface-container border-l-4 border-primary">
                  <span className="block text-primary font-bold text-3xl mb-1">
                    794
                  </span>
                  <span className="text-xs uppercase tracking-widest font-label">
                    สายเลือดยุคโบราณ
                  </span>
                </div>
                <div className="p-6 bg-surface-container border-l-4 border-secondary">
                  <span className="block text-secondary font-bold text-3xl mb-1">
                    12
                  </span>
                  <span className="text-xs uppercase tracking-widest font-label">
                    วิเคราะห์ลักษณ์
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low ink-wash relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-on-background mb-4">
              เทคโนโลยีผสานเวทมนตร์
            </h2>
            <p className="text-secondary font-label uppercase tracking-widest">
              เชื่อมโยงศตวรรษด้วยนวัตกรรม
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:h-[700px]">
            <div className="md:col-span-7 bg-on-background group relative overflow-hidden flex flex-col justify-end p-10">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                alt="futuristic facial mapping visualization"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9MOI1JvVl7leqGqIAVPhQXLx6sF5mZ9KMGlG6wTeLzDOa-C4KAmiyCEo8p3uCI-L_MG8LLWAKHttnWoNKGIFPvwUXzqogCEq7VNGOBTRueHFDi_W11m7ADP1OpbyGqW0PQsTGy3jn7Uh-ZxnruKlGK-vHrwe1pikWml0PfFBJAswAdPV3DAOo0yQ864FBQy35rdI9HZeHtmmLJ90mC8m4Iyn6rxPt4fZYyp8c96kNYgQtFoev0QUnKLH9boVY6bDsB3cDO3i5QpI"
              />
              <div className="relative z-10">
                <span
                  className="text-secondary material-symbols-outlined text-4xl mb-4"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  biotech
                </span>
                <h3 className="text-3xl font-bold text-surface-bright mb-4">
                  เครื่องจำลองปากัว
                </h3>
                <p className="text-surface-variant max-w-md">
                  เครือข่ายประสาทเทียมเอกสิทธิ์เฉพาะของเราแปลพิกัดใบหน้าหลายพันจุด เป็นผลการอ่านทิศทางชะตาของโหงวเฮ้งระดับคลาสสิกด้วยความเเม่นยำถึง 98.4%
                </p>
              </div>
              <div className="absolute top-6 right-6">
                <span className="text-primary text-6xl opacity-10 font-bold">
                  01
                </span>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              <div className="bg-surface-container-highest p-8 relative flex flex-col justify-between border-b-2 border-secondary border-opacity-20">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    history_edu
                  </span>
                  <span className="text-secondary text-opacity-40 text-4xl font-bold">
                    02
                  </span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-on-background mb-2">
                    เปรียบเทียบบรรพบุรุษ
                  </h4>
                  <p className="text-on-surface-variant">
                    สืบสายรอยแผลและใบหน้าสู่ต้นกำเนิดโบราณและสายเลือดระดับราชวงศ์
                  </p>
                </div>
              </div>

              <div className="bg-primary text-on-primary p-8 relative flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-secondary-container text-3xl">
                    insights
                  </span>
                  <span className="text-on-primary text-opacity-20 text-4xl font-bold">
                    03
                  </span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">การแปรเปลี่ยนของพลังชี่</h4>
                  <p className="text-on-primary-container">
                    วิเคราะห์ตามเวลาจริงถึงการเปลี่ยนแปลงพลังชีวิตตามสภาวะแวดล้อมต่างๆ ภายในแต่ละวัน
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border border-secondary border-opacity-30 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img
            className="w-full h-full object-repeat"
            alt="subtle repeating pattern"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbzVUl6Tn4j8no-d5evTJfzSePdViY1TKDdsJN7Ebax9kYEFJdtBYA6rXIv4ULLwgmiUDZSNxOOTHs5Mk5IYBcrCAUTVmoler-mGlDV5PHzRBNQ_17y6Z-5Rkrn2Mj49KR9ZmNVaSsGNkPqKjrH7zpE6Ie_ItRfDL2Zd72kf6S_ha58UIr7iaJOhQxoUKnd5Gp3GCSzv_BzMF7YOEpK0rRhMlruAHoJWOYzpNi-d1pR7zyRnLcE6TDQKxMJtymXw8ufvYEWl3UUoc"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6 tracking-tight">
              เข้าสู่หอสมุดหลวง
            </h2>
            <p className="text-on-surface-variant italic">
              ปกป้องคำทำนายของคุณในคลังสมบัติที่คุ้มครองโดยราชเลขาธิการ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-surface-container-high border-2 border-primary border-opacity-10 group-hover:border-opacity-100 transition-all rotate-45">
                <span className="material-symbols-outlined text-primary -rotate-45 text-3xl">
                  lock
                </span>
              </div>
              <h5 className="text-xl font-bold mb-3 uppercase tracking-widest">
                ตราแห่งความลับ
              </h5>
              <p className="text-on-surface-variant font-headline text-sm">
                ข้อมูลใบหน้าของคุณถูกเข้ารหัสด้วยโปรโตคอลความปลอดภัยระดับทหาร
              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-surface-container-high border-2 border-secondary border-opacity-10 group-hover:border-opacity-100 transition-all rotate-45">
                <span className="material-symbols-outlined text-secondary -rotate-45 text-3xl">
                  workspace_premium
                </span>
              </div>
              <h5 className="text-xl font-bold mb-3 uppercase tracking-widest">
                สถานะขุนนาง
              </h5>
              <p className="text-on-surface-variant font-headline text-sm">
                ปลดล็อกการวิเคราะห์เชิงลึกที่เคยสงวนไว้สำหรับชนชั้นสูงของราชวงศ์เท่านั้น
              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-surface-container-high border-2 border-primary border-opacity-10 group-hover:border-opacity-100 transition-all rotate-45">
                <span className="material-symbols-outlined text-primary -rotate-45 text-3xl">
                  cloud_sync
                </span>
              </div>
              <h5 className="text-xl font-bold mb-3 uppercase tracking-widest">
                ซิงค์พลังชี่
              </h5>
              <p className="text-on-surface-variant font-headline text-sm">
                ซิงค์คำทำนายผ่านทุกอุปกรณ์ในระบบนิเวศจักรพรรดิของคุณอย่างไร้รอยต่อ
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-on-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            className="w-full h-full object-cover"
            alt="vibrant long exposure firework show against a pitch black sky"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6CDUeyuCOwGTudfEknxf8z3mmACusEt-ObOUT_avMcs4C-QD-aM6EYMrlobu8Cs59slVYXsE-guunFAVXhPEUxV3Q7Xm_BrVXNbTHNoJHxU6MhJ2pnH6K6nzVHbdL7zy6X8gFmoTiFgBXZUuj5ncXGMCvB9c3_jUqCsxmhPiCS2gMuWHablQs4GBsQ1GV9VsPQCg4eJCRMQ9Oud4HCQTQFCo-K9FNMNIbohNBZq-MGGXvqa0iWn0Ir3WSuivNUqH7SOQDYyxIJtI"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-surface-bright mb-10 tracking-tighter">
            ชะตาของคุณถูกลิขิตไว้แล้ว <br />
            <span className="text-secondary">จงอ่านมัน</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link href="/analysis" className="group relative px-16 py-6 bg-secondary text-on-secondary font-bold text-xl uppercase tracking-[0.2em] hover:scale-105 transition-all outline-none">
              <span className="relative z-10">เริ่มสแกนดวงชะตา</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2 text-surface-variant text-opacity-60 font-label text-sm uppercase tracking-widest">
            <span>สายเลือดที่แท้จริง</span>
            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
            <span>ความแม่นยำ 98.4%</span>
          </div>
        </div>
      </section>
    </>
  );
}
