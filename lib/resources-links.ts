export type Platform = "YouTube" | "LinkedIn" | "Facebook";

export interface ResourceLink {
  /** Thai title (always required) */
  title_th: string;
  /** English title (optional, falls back to title_th) */
  title_en?: string;
  /** Source platform */
  platform: Platform;
  /** External URL */
  url: string;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Thumbnail URL (optional) */
  thumbnailUrl?: string;
  /** Short Thai summary (optional, 1 line) */
  summary_th?: string;
}

/**
 * Curated knowledge links from external platforms.
 * Sorted by newest first when rendered.
 *
 * ──────────────────────────────────────
 *  To add a new item, append an object
 *  to this array following the shape above.
 * ──────────────────────────────────────
 */
export const resourcesLinks: ResourceLink[] = [
  {
    title_th: "แนะนำสมาคม ECTI และกิจกรรมประจำปี 2569",
    title_en: "Introduction to ECTI Association & 2026 Activities",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example1",
    date: "2026-02-20",
    summary_th: "ภาพรวมสมาคมและปฏิทินกิจกรรมวิชาการปี 2569",
  },
  {
    title_th: "เทรนด์ AI และ 6G ในงานวิจัยปัจจุบัน",
    title_en: "AI & 6G Trends in Current Research",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example2",
    date: "2026-02-10",
    summary_th: "สรุปหัวข้อวิจัยยอดนิยมจาก ECTI-CON 2025",
  },
  {
    title_th: "ECTI-CON 2026 เปิดรับบทความแล้ว",
    title_en: "ECTI-CON 2026 Call for Papers Open",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/example1",
    date: "2026-01-28",
    summary_th: "ส่งบทความได้ถึง 30 เมษายน 2569",
  },
  {
    title_th: "ผลรางวัลบทความดีเด่น ECTI-CON 2025",
    title_en: "ECTI-CON 2025 Best Paper Awards",
    platform: "Facebook",
    url: "https://www.facebook.com/ecti/posts/example1",
    date: "2026-01-15",
    summary_th: "ประกาศผลรางวัลบทความดีเด่นประจำปี",
  },
  {
    title_th: "บรรยายพิเศษ: Quantum Computing สำหรับวิศวกรรมไฟฟ้า",
    title_en: "Special Lecture: Quantum Computing for EE",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example3",
    date: "2025-12-20",
    summary_th: "บันทึกการบรรยายจากงาน ECTI Workshop 2025",
  },
  {
    title_th: "ECTI ร่วมลงนาม MOU กับ IEEE Thailand Section",
    title_en: "ECTI Signs MOU with IEEE Thailand Section",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/example2",
    date: "2025-12-05",
    summary_th: "ความร่วมมือทางวิชาการเพื่อพัฒนาคุณภาพวารสาร",
  },
  {
    title_th: "สรุปกิจกรรม ECTI Workshop on IoT 2025",
    platform: "Facebook",
    url: "https://www.facebook.com/ecti/posts/example2",
    date: "2025-11-18",
    summary_th: "ภาพบรรยากาศและเนื้อหาจากสัมมนาเชิงปฏิบัติการ IoT",
  },
  {
    title_th: "วิธีส่งบทความวารสาร ECTI-CIT ผ่านระบบออนไลน์",
    title_en: "How to Submit Papers to ECTI-CIT Online",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example4",
    date: "2025-11-01",
    summary_th: "คู่มือแนะนำขั้นตอนการส่งบทความสำหรับผู้เขียน",
  },
];
