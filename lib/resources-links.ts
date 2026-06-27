export type Platform = "YouTube" | "LinkedIn" | "Facebook";

export interface ResourceLink {
  /** Title */
  title: string;
  /** Source platform */
  platform: Platform;
  /** External URL */
  url: string;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** Thumbnail URL (optional) */
  thumbnailUrl?: string;
  /** Short summary (optional, 1 line) */
  summary?: string;
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
    title: "แนะนำสมาคม ECTI และกิจกรรมประจำปี 2569",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example1",
    date: "2026-02-20",
    summary: "ภาพรวมสมาคมและปฏิทินกิจกรรมวิชาการปี 2569",
  },
  {
    title: "เทรนด์ AI และ 6G ในงานวิจัยปัจจุบัน",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example2",
    date: "2026-02-10",
    summary: "สรุปหัวข้อวิจัยยอดนิยมจาก ECTI-CON 2025",
  },
  {
    title: "ECTI-CON 2026 เปิดรับบทความแล้ว",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/example1",
    date: "2026-01-28",
    summary: "ส่งบทความได้ถึง 30 เมษายน 2569",
  },
  {
    title: "ผลรางวัลบทความดีเด่น ECTI-CON 2025",
    platform: "Facebook",
    url: "https://www.facebook.com/ecti/posts/example1",
    date: "2026-01-15",
    summary: "ประกาศผลรางวัลบทความดีเด่นประจำปี",
  },
  {
    title: "บรรยายพิเศษ: Quantum Computing สำหรับวิศวกรรมไฟฟ้า",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example3",
    date: "2025-12-20",
    summary: "บันทึกการบรรยายจากงาน ECTI Workshop 2025",
  },
  {
    title: "ECTI ร่วมลงนาม MOU กับ IEEE Thailand Section",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/example2",
    date: "2025-12-05",
    summary: "ความร่วมมือทางวิชาการเพื่อพัฒนาคุณภาพวารสาร",
  },
  {
    title: "สรุปกิจกรรม ECTI Workshop on IoT 2025",
    platform: "Facebook",
    url: "https://www.facebook.com/ecti/posts/example2",
    date: "2025-11-18",
    summary: "ภาพบรรยากาศและเนื้อหาจากสัมมนาเชิงปฏิบัติการ IoT",
  },
  {
    title: "วิธีส่งบทความวารสาร ECTI-CIT ผ่านระบบออนไลน์",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=example4",
    date: "2025-11-01",
    summary: "คู่มือแนะนำขั้นตอนการส่งบทความสำหรับผู้เขียน",
  },
];
