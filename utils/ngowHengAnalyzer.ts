export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface MetricResult {
  icon: string;
  titleTh: string;
  descEn: string;
}

export interface ZoneAnalysis {
  results: MetricResult[];
  score: number;
  metrics: Record<string, number>;
}

export interface NgowHengReport {
  totalScore: number;
  eyes: ZoneAnalysis;
  nose: ZoneAnalysis;
  mouth: ZoneAnalysis;
  jaw: ZoneAnalysis;
}

// ── Landmark Indices ─────────────────────────────────────────────
const L_EYE_OUTER = 33; const R_EYE_OUTER = 263;
const L_EYE_INNER = 133; const R_EYE_INNER = 362;
const L_EYE_TOP = 159; const L_EYE_BOTTOM = 145;
const R_EYE_TOP = 386; const R_EYE_BOTTOM = 374;
// const L_BROW_INNER = 55; const R_BROW_INNER = 285;
// const L_BROW_OUTER = 46; const R_BROW_OUTER = 276;
const L_BROW_TOP = 105; const R_BROW_TOP = 334;

const NOSE_TIP = 4;
const NOSE_L_NOSTRIL = 64; const NOSE_R_NOSTRIL = 294;
// const NOSE_L_WING = 129; const NOSE_R_WING = 358;
// const NOSE_BOTTOM = 2;

const MOUTH_LEFT = 61; const MOUTH_RIGHT = 291;
const UPPER_LIP_MID = 13; const LOWER_LIP_MID = 14;
const UPPER_LIP_OUTER = 0; const LOWER_LIP_OUTER = 17;

const CHIN_TIP = 152;
const FOREHEAD_TOP = 10;
// const FOREHEAD_MID = 151;
const L_TEMPLE = 127; const R_TEMPLE = 356;
const L_CHEEK = 234; const R_CHEEK = 454;
// const L_CHEEKBONE = 116; const R_CHEEKBONE = 345;

// ── Helpers ──────────────────────────────────────────────────────
const dist = (lms: Landmark[], i: number, j: number) => {
  const dx = lms[i].x - lms[j].x;
  const dy = lms[i].y - lms[j].y;
  return Math.sqrt(dx * dx + dy * dy);
};

const stdDev = (arr: number[]) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length
  );
};

const ptp = (arr: number[]) => {
  return Math.max(...arr) - Math.min(...arr);
};

// ── Eyes ─────────────────────────────────────────────────────────
export const analyzeEyes = (lms: Landmark[]): ZoneAnalysis => {
  const results: MetricResult[] = [];
  let score = 0;

  const l_w = dist(lms, L_EYE_OUTER, L_EYE_INNER);
  const r_w = dist(lms, R_EYE_OUTER, R_EYE_INNER);
  const l_h = dist(lms, L_EYE_TOP, L_EYE_BOTTOM);
  const r_h = dist(lms, R_EYE_TOP, R_EYE_BOTTOM);

  const eye_aspect = ((l_h + r_h) / 2) / ((l_w + r_w) / 2);
  const eye_sym = Math.min(l_w, r_w) / Math.max(l_w, r_w);
  const inter_eye = dist(lms, L_EYE_INNER, R_EYE_INNER);
  const avg_w = (l_w + r_w) / 2;
  const spacing_r = inter_eye / avg_w;
  const brow_gap = dist(lms, L_BROW_TOP, L_EYE_TOP) / avg_w;

  if (eye_aspect >= 0.28) {
    results.push({ icon: "✅", titleTh: "ดวงตายาวรี", descEn: "Elongated eyes — intelligence & good character" });
    score += 2;
  } else if (eye_aspect >= 0.22) {
    results.push({ icon: "⚠️", titleTh: "ดวงตาพอดี", descEn: "Average eye ratio — neutral" });
    score += 1;
  } else {
    results.push({ icon: "❌", titleTh: "ตาเล็ก/สั้น", descEn: "Small eyes — may lack wisdom" });
  }

  if (spacing_r >= 0.90) {
    results.push({ icon: "✅", titleTh: "ตาห่างพอดี", descEn: "Well-spaced — honest & trustworthy" });
    score += 2;
  } else {
    results.push({ icon: "❌", titleTh: "ตาชิดกัน", descEn: "Close-set eyes — may be untrustworthy" });
  }

  if (eye_sym >= 0.92) {
    results.push({ icon: "✅", titleTh: "ตาสมมาตร", descEn: "Symmetric eyes — balanced life" });
    score += 1;
  } else {
    results.push({ icon: "⚠️", titleTh: "ตาไม่เท่ากัน", descEn: "Asymmetric — life has ups & downs" });
  }

  if (brow_gap >= 0.18) {
    results.push({ icon: "✅", titleTh: "หว่างคิ้วกว้าง", descEn: "Good brow-eye gap — patient, generous" });
    score += 1;
  } else {
    results.push({ icon: "❌", titleTh: "คิ้วต่ำชิดตา", descEn: "Low brows — short-tempered" });
  }

  return {
    results,
    score,
    metrics: {
      eye_aspect: Number(eye_aspect.toFixed(3)),
      eye_spacing: Number(spacing_r.toFixed(3)),
      eye_symmetry: Number(eye_sym.toFixed(3)),
      brow_gap: Number(brow_gap.toFixed(3))
    }
  };
};

// ── Nose ─────────────────────────────────────────────────────────
export const analyzeNose = (lms: Landmark[]): ZoneAnalysis => {
  const results: MetricResult[] = [];
  let score = 0;

  const bridge_xs = [6, 197, 195, 5].map((i) => lms[i].x);
  const bridge_dev = stdDev(bridge_xs) / (ptp(bridge_xs) + 1e-6);
  const nose_w = dist(lms, NOSE_L_NOSTRIL, NOSE_R_NOSTRIL);
  const face_w = dist(lms, L_CHEEK, R_CHEEK);
  const nose_len = dist(lms, 6, NOSE_TIP);
  const face_h = dist(lms, FOREHEAD_TOP, CHIN_TIP);
  const tip_uplift = (lms[NOSE_L_NOSTRIL].y - lms[NOSE_TIP].y) / (nose_len + 1e-6);
  const w_ratio = nose_w / face_w;
  const l_ratio = nose_len / face_h;

  if (bridge_dev < 0.15) {
    results.push({ icon: "✅", titleTh: "สันจมูกตรง", descEn: "Straight bridge — good decisions & authority" });
    score += 2;
  } else {
    results.push({ icon: "❌", titleTh: "สันจมูกคด", descEn: "Crooked bridge — unstable character" });
  }

  if (tip_uplift < 0.10) {
    results.push({ icon: "✅", titleTh: "ปลายจมูกไม่เชิด", descEn: "Tip not upturned — able to save wealth" });
    score += 2;
  } else if (tip_uplift < 0.20) {
    results.push({ icon: "⚠️", titleTh: "ปลายจมูกเชิดเล็กน้อย", descEn: "Slightly upturned — watch finances" });
    score += 1;
  } else {
    results.push({ icon: "❌", titleTh: "ปลายจมูกเชิด", descEn: "Upturned tip — difficulty saving money" });
  }

  if (w_ratio >= 0.22 && w_ratio <= 0.32) {
    results.push({ icon: "✅", titleTh: "ปีกจมูกสมดุล", descEn: "Balanced wings — good health & support" });
    score += 2;
  } else if (w_ratio > 0.32) {
    results.push({ icon: "⚠️", titleTh: "ปีกจมูกกว้าง", descEn: "Wide wings — ambitious, possibly domineering" });
    score += 1;
  } else {
    results.push({ icon: "❌", titleTh: "ปีกจมูกบาง", descEn: "Thin wings — lacks responsibility" });
  }

  if (l_ratio >= 0.28 && l_ratio <= 0.38) {
    results.push({ icon: "✅", titleTh: "จมูกได้สัดส่วน", descEn: "Well-proportioned length — balanced fortune" });
    score += 1;
  } else {
    results.push({ icon: "⚠️", titleTh: "จมูกสั้น/ยาว", descEn: "Off-proportion nose — check other features" });
  }

  return {
    results,
    score,
    metrics: {
      bridge_straight: Number((1 - bridge_dev).toFixed(3)),
      nose_w_ratio: Number(w_ratio.toFixed(3)),
      nose_len_ratio: Number(l_ratio.toFixed(3)),
      tip_uplift: Number(tip_uplift.toFixed(3))
    }
  };
};

// ── Mouth ────────────────────────────────────────────────────────
export const analyzeMouth = (lms: Landmark[]): ZoneAnalysis => {
  const results: MetricResult[] = [];
  let score = 0;

  const m_w = dist(lms, MOUTH_LEFT, MOUTH_RIGHT);
  const face_w = dist(lms, L_CHEEK, R_CHEEK);
  const m_ratio = m_w / face_w;
  const u_h = Math.abs(lms[UPPER_LIP_MID].y - lms[UPPER_LIP_OUTER].y);
  const l_h = Math.abs(lms[LOWER_LIP_MID].y - lms[LOWER_LIP_OUTER].y);
  const lip_r = u_h / (l_h + 1e-6);
  const l_cy = lms[MOUTH_LEFT].y;
  const r_cy = lms[MOUTH_RIGHT].y;
  const lip_h = Math.abs(lms[UPPER_LIP_OUTER].y - lms[LOWER_LIP_OUTER].y);
  const skew = Math.abs(l_cy - r_cy) / (lip_h + 1e-6);
  const gap_r = Math.abs(lms[UPPER_LIP_MID].y - lms[LOWER_LIP_MID].y) / (m_w + 1e-6);

  if (m_ratio >= 0.30 && m_ratio <= 0.42) {
    results.push({ icon: "✅", titleTh: "ปากกว้างพอดี", descEn: "Well-proportioned mouth — success & good fortune (age 51-65)" });
    score += 2;
  } else if (m_ratio > 0.42) {
    results.push({ icon: "⚠️", titleTh: "ปากกว้างมาก", descEn: "Very wide — socially gifted" });
    score += 1;
  } else {
    results.push({ icon: "❌", titleTh: "ปากแหลม/แคบ", descEn: "Pointed/narrow mouth — may lack compassion" });
  }

  if (skew < 0.12) {
    results.push({ icon: "✅", titleTh: "ปากไม่เบี้ยว", descEn: "Symmetric mouth — honest" });
    score += 2;
  } else {
    results.push({ icon: "❌", titleTh: "ปากเบี้ยว", descEn: "Crooked mouth — tendency toward dishonesty" });
  }

  if (gap_r < 0.05) {
    results.push({ icon: "✅", titleTh: "ปิดปากสนิท", descEn: "Lips close well — disciplined" });
    score += 1;
  } else {
    results.push({ icon: "⚠️", titleTh: "ปากอ้าเล็กน้อย", descEn: "Slightly open at rest — tends to over-speak" });
  }

  if (lip_r >= 0.80 && lip_r <= 1.40) {
    results.push({ icon: "✅", titleTh: "ริมฝีปากสมดุล", descEn: "Balanced lip ratio — prosperity in mature years" });
    score += 2;
  } else {
    results.push({ icon: "⚠️", titleTh: "ริมฝีปากไม่สมดุล", descEn: "Unbalanced lips — be careful with words" });
    score += 1;
  }

  return {
    results,
    score,
    metrics: {
      mouth_w_ratio: Number(m_ratio.toFixed(3)),
      lip_ratio: Number(lip_r.toFixed(3)),
      mouth_symmetry: Number((1 - skew).toFixed(3)),
      gap_ratio: Number(gap_r.toFixed(3))
    }
  };
};

// ── Jaw & 3 Palaces ──────────────────────────────────────────────
export const analyzeJaw = (lms: Landmark[]): ZoneAnalysis => {
  const results: MetricResult[] = [];
  let score = 0;

  const brow_y = (lms[L_BROW_TOP].y + lms[R_BROW_TOP].y) / 2;
  const nose_y = lms[NOSE_TIP].y;
  const chin_y = lms[CHIN_TIP].y;
  const fore_y = lms[FOREHEAD_TOP].y;

  const h_sky = Math.abs(brow_y - fore_y);
  const h_human = Math.abs(nose_y - brow_y);
  const h_earth = Math.abs(chin_y - nose_y);
  const total = h_sky + h_human + h_earth + 1e-6;

  const sky_p = h_sky / total;
  const hum_p = h_human / total;
  const ear_p = h_earth / total;

  const fore_w = dist(lms, L_TEMPLE, R_TEMPLE);
  const jaw_w = dist(lms, 172, 397);
  const taper = jaw_w / (fore_w + 1e-6);
  const chin_w = dist(lms, 172, 397);
  const chin_h = dist(lms, NOSE_TIP, CHIN_TIP);
  const chin_r = chin_w / (chin_h + 1e-6);

  if (Math.max(Math.abs(sky_p - hum_p), Math.abs(hum_p - ear_p)) < 0.04) {
    results.push({ icon: "✅", titleTh: "วังทั้ง 3 สมดุล", descEn: "All 3 palaces balanced — excellent overall fortune" });
    score += 3;
  } else if (sky_p === Math.max(sky_p, hum_p, ear_p)) {
    results.push({ icon: "✅", titleTh: "วังฟ้าโดดเด่น", descEn: "Sky palace dominant — very intelligent, but luck requires effort" });
    score += 2;
  } else if (hum_p === Math.max(sky_p, hum_p, ear_p)) {
    results.push({ icon: "✅", titleTh: "วังมนุษย์โดดเด่น", descEn: "Human palace dominant — wealth from age 40+" });
    score += 2;
  } else {
    results.push({ icon: "✅", titleTh: "วังดินโดดเด่น", descEn: "Earth palace dominant — longevity, good descendants" });
    score += 2;
  }

  if (taper < 0.72) {
    results.push({ icon: "⚠️", titleTh: "หน้าสามเหลี่ยม", descEn: "Triangular face — watch family relationships" });
  } else if (taper < 0.82) {
    results.push({ icon: "✅", titleTh: "หน้าไข่", descEn: "Oval face — balanced, charming personality" });
    score += 2;
  } else if (taper < 0.92) {
    results.push({ icon: "✅", titleTh: "หน้ากลม", descEn: "Round face — kind-hearted, well-liked" });
    score += 2;
  } else {
    results.push({ icon: "✅", titleTh: "หน้าสี่เหลี่ยม", descEn: "Square face — strong, natural leader" });
    score += 2;
  }

  if (chin_r >= 1.0) {
    results.push({ icon: "✅", titleTh: "คางอิ่มเต็ม", descEn: "Full chin — happiness in late life, good descendants" });
    score += 1;
  } else {
    results.push({ icon: "⚠️", titleTh: "คางแหลม/เล็ก", descEn: "Small chin — later life requires more effort" });
  }

  return {
    results,
    score,
    metrics: {
      "sky_palace%": Number((sky_p * 100).toFixed(1)),
      "human_palace%": Number((hum_p * 100).toFixed(1)),
      "earth_palace%": Number((ear_p * 100).toFixed(1)),
      face_taper: Number(taper.toFixed(3)),
      chin_ratio: Number(chin_r.toFixed(3))
    }
  };
};

export const runFullAnalysis = (landmarks: Landmark[]): NgowHengReport => {
  const eyes = analyzeEyes(landmarks);
  const nose = analyzeNose(landmarks);
  const mouth = analyzeMouth(landmarks);
  const jaw = analyzeJaw(landmarks);

  return {
    totalScore: eyes.score + nose.score + mouth.score + jaw.score,
    eyes,
    nose,
    mouth,
    jaw
  };
};
