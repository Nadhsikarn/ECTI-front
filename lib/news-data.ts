export type NewsTag =
  | "announcements"
  | "cfp"
  | "awards"
  | "publications"
  | "community";

export interface NewsPost {
  id: number;
  slug: string;
  title_th: string;
  title_en: string;
  summary_th: string;
  summary_en: string;
  body: any[];      // Rich text blocks
  body_en: any[];
  date: string;     // ISO date
  tags: NewsTag[];
  author?: string;
  readTimeMin: number;
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news-posts?populate=tags&sort=date:desc`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title_th: item.title ?? "",
    title_en: item.title_en ?? "",
    summary_th: item.summary ?? "",
    summary_en: item.summary_en ?? "",
    body: item.body ?? [],
    body_en: item.body_en ?? [],
    date: item.date ?? "",
    tags: (item.tags ?? []).map((t: any) => t.name_en as NewsTag),
    author: item.author ?? undefined,
    readTimeMin: item.read_time_min ?? 1,
  }));
}

/*export const newsPosts: NewsPost[] = [
  {
    slug: "ecti-con-2026-cfp",
    title_th: "เปิดรับบทความ ECTI-CON 2026",
    title_en: "ECTI-CON 2026 Call for Papers Now Open",
    summary_th:
      "สมาคม ECTI เปิดรับบทความวิจัยสำหรับการประชุมวิชาการนานาชาติ ECTI-CON 2026 ณ จ.เชียงใหม่",
    summary_en:
      "ECTI Association is now accepting research paper submissions for ECTI-CON 2026 in Chiang Mai.",
    body_th:
      "สมาคม ECTI ขอเชิญนักวิจัย อาจารย์ และนักศึกษาระดับบัณฑิตศึกษาส่งบทความวิจัยสำหรับการประชุมวิชาการนานาชาติ ECTI-CON 2026 ครั้งที่ 23 ที่จะจัดขึ้นระหว่างวันที่ 9-12 กรกฎาคม 2569 ณ โรงแรมเลอ เมอริเดียน เชียงใหม่\n\nการประชุมครั้งนี้ครอบคลุมหัวข้อวิจัยหลากหลาย ได้แก่ ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง, การสื่อสาร 6G, การประมวลผลควอนตัม, IoT และระบบฝังตัว, ความมั่นคงปลอดภัยไซเบอร์ และอื่นๆ อีกมากมาย\n\nบทความที่ได้รับการตอบรับจะถูกตีพิมพ์ใน IEEE Xplore และวารสาร ECTI Transactions บทความดีเด่นจะได้รับรางวัล Best Paper Award\n\nกำหนดการสำคัญ:\n- กำหนดส่งบทความ: 30 เมษายน 2569\n- แจ้งผลพิจารณา: 31 พฤษภาคม 2569\n- ส่งฉบับสมบูรณ์: 15 มิถุนายน 2569",
    body_en:
      "ECTI Association invites researchers, academics, and graduate students to submit research papers for the 23rd ECTI International Conference (ECTI-CON 2026), to be held July 9-12, 2026 at Le Meridien Chiang Mai.\n\nThe conference covers a wide range of research topics including Artificial Intelligence & Machine Learning, 6G Communications, Quantum Computing, IoT & Embedded Systems, Cybersecurity, and many more.\n\nAccepted papers will be published in IEEE Xplore and ECTI Transactions journals. Outstanding papers will receive the Best Paper Award.\n\nImportant Dates:\n- Paper Submission Deadline: April 30, 2026\n- Notification of Acceptance: May 31, 2026\n- Camera-Ready Submission: June 15, 2026",
    date: "2026-02-28",
    date_th: "28 กุมภาพันธ์ 2569",
    date_en: "February 28, 2026",
    tags: ["cfp", "announcements"],
    readTimeMin: 3,
  },
  {
    slug: "ecti-board-election-2026",
    title_th: "ผลการเลือกตั้งคณะกรรมการบริหาร ECTI ประจำปี 2569-2571",
    title_en: "ECTI Board of Directors Election Results 2026-2028",
    summary_th:
      "ประกาศผลการเลือกตั้งคณะกรรมการบริหารสมาคม ECTI วาระใหม่ พร้อมทิศทางการดำเนินงาน",
    summary_en:
      "Announcement of the newly elected ECTI Board of Directors and strategic direction.",
    body_th:
      "สมาคม ECTI ขอประกาศผลการเลือกตั้งคณะกรรมการบริหารสมาคมวาระ พ.ศ. 2569-2571 โดยผ่านการลงมติจากสมาชิกสมาคมในการประชุมใหญ่สามัญประจำปี\n\nนายกสมาคมคนใหม่ ศ.ดร. ก. กิตติคุณ จากมหาวิทยาลัย ก ได้รับเลือกด้วยคะแนนเสียงข้างมาก พร้อมด้วยคณะกรรมการบริหารชุดใหม่จำนวน 15 ท่าน\n\nทิศทางการดำเนินงานหลักของวาระนี้ ได้แก่:\n- ขยายความร่วมมือระดับนานาชาติกับสมาคมวิชาชีพในภูมิภาค ASEAN\n- ยกระดับวารสาร ECTI Transactions ให้เข้าสู่ฐานข้อมูลระดับสากลเพิ่มเติม\n- ส่งเสริมการวิจัยด้าน AI, Quantum Computing และ Green Technology\n- เพิ่มกิจกรรมสำหรับสมาชิกรุ่นใหม่และนักศึกษา",
    body_en:
      "ECTI Association announces the results of the Board of Directors election for the 2026-2028 term, approved by members at the Annual General Meeting.\n\nThe new President, Prof. Dr. A. Kittikun from University A, was elected by majority vote, along with 15 new board members.\n\nKey strategic directions for this term include:\n- Expanding international collaboration with professional associations in the ASEAN region\n- Elevating ECTI Transactions journals to additional international databases\n- Promoting research in AI, Quantum Computing, and Green Technology\n- Increasing activities for young members and students",
    date: "2026-01-15",
    date_th: "15 มกราคม 2569",
    date_en: "January 15, 2026",
    tags: ["announcements", "community"],
    author: "ECTI Secretariat",
    readTimeMin: 4,
  },
  {
    slug: "ecti-cit-scopus-indexed",
    title_th: "ECTI-CIT ได้รับการจัดอันดับในฐานข้อมูล Scopus",
    title_en: "ECTI-CIT Journal Indexed in Scopus",
    summary_th:
      "วารสาร ECTI Transactions on Computer and Information Technology ได้รับการจัดอันดับใน Scopus",
    summary_en:
      "ECTI Transactions on Computer and Information Technology has been officially indexed in Scopus.",
    body_th:
      "สมาคม ECTI ยินดีที่จะประกาศว่าวารสาร ECTI Transactions on Computer and Information Technology (ECTI-CIT) ได้รับการจัดอันดับในฐานข้อมูล Scopus อย่างเป็นทางการ นับเป็นความสำเร็จครั้งสำคัญของวารสารและสมาคม\n\nการจัดอันดับนี้เป็นผลจากความพยายามอย่างต่อเนื่องของกองบรรณาธิการและผู้ทรงคุณวุฒิในการรักษาคุณภาพของบทความวิจัย ซึ่งจะช่วยเพิ่มการมองเห็นและผลกระทบของผลงานวิจัยที่ตีพิมพ์ในวารสาร\n\nขอเชิญนักวิจัยทุกท่านส่งผลงานวิจัยคุณภาพสูงเพื่อตีพิมพ์ในวารสาร ECTI-CIT",
    body_en:
      "ECTI Association is pleased to announce that ECTI Transactions on Computer and Information Technology (ECTI-CIT) has been officially indexed in the Scopus database. This represents a significant milestone for the journal and the association.\n\nThis indexing is the result of continuous efforts by the editorial board and reviewers to maintain the quality of research articles, which will help increase the visibility and impact of published research.\n\nResearchers are encouraged to submit high-quality research papers for publication in ECTI-CIT.",
    date: "2025-12-20",
    date_th: "20 ธันวาคม 2568",
    date_en: "December 20, 2025",
    tags: ["publications", "announcements"],
    readTimeMin: 2,
  },
  {
    slug: "ecti-con-2025-summary",
    title_th: "สรุปผลการประชุม ECTI-CON 2025",
    title_en: "ECTI-CON 2025 Conference Summary",
    summary_th:
      "สรุปผลการจัดประชุมวิชาการ ECTI-CON 2025 มีผู้เข้าร่วมกว่า 500 คน",
    summary_en:
      "ECTI-CON 2025 concluded with over 500 attendees and 200+ paper presentations.",
    body_th:
      "การประชุมวิชาการนานาชาติ ECTI-CON 2025 ครั้งที่ 22 จัดขึ้นระหว่างวันที่ 25-28 มิถุนายน 2568 ณ โรงแรมอมารี วอเตอร์เกท กรุงเทพมหานคร ประสบความสำเร็จอย่างดียิ่ง\n\nไฮไลท์สำคัญ:\n- ผู้เข้าร่วมกว่า 500 คนจาก 15 ประเทศ\n- บทความที่นำเสนอมากกว่า 200 บทความ\n- วิทยากรรับเชิญ 4 ท่านจากสถาบันชั้นนำระดับโลก\n- การประชุมเชิงปฏิบัติการพิเศษ 6 หัวข้อ\n\nบทความดีเด่นได้รับการคัดเลือกให้ตีพิมพ์ในวารสาร ECTI-EEC และ ECTI-CIT ฉบับพิเศษ ขอขอบคุณผู้สนับสนุนทุกท่านที่ทำให้การประชุมครั้งนี้สำเร็จลุล่วงด้วยดี",
    body_en:
      "The 22nd ECTI International Conference (ECTI-CON 2025) was held June 25-28, 2025 at Amari Watergate, Bangkok, and was a resounding success.\n\nKey Highlights:\n- Over 500 participants from 15 countries\n- More than 200 paper presentations\n- 4 keynote speakers from world-leading institutions\n- 6 special workshop sessions\n\nBest papers have been selected for publication in special issues of ECTI-EEC and ECTI-CIT journals. We thank all sponsors and participants who made this conference a success.",
    date: "2025-11-05",
    date_th: "5 พฤศจิกายน 2568",
    date_en: "November 5, 2025",
    tags: ["community", "announcements"],
    author: "ECTI-CON 2025 Organizing Committee",
    readTimeMin: 3,
  },
  {
    slug: "best-paper-award-2025",
    title_th: "ประกาศรางวัลบทความดีเด่น ECTI-CON 2025",
    title_en: "ECTI-CON 2025 Best Paper Awards Announced",
    summary_th:
      "ประกาศผลรางวัลบทความดีเด่นจากการประชุมวิชาการ ECTI-CON 2025",
    summary_en:
      "Best Paper Award winners from the ECTI-CON 2025 conference have been announced.",
    body_th:
      "สมาคม ECTI ขอแสดงความยินดีกับผู้ได้รับรางวัลบทความดีเด่นจากการประชุมวิชาการ ECTI-CON 2025\n\nรางวัลบทความดีเด่น (Best Paper Award):\n1. \"Deep Learning-based Anomaly Detection in 5G Networks\" โดย ดร. ฐ. ฐานันดร จากมหาวิทยาลัย ค\n2. \"Energy-Efficient Edge Computing for IoT Applications\" โดย ดร. ด. ดวงกมล จากมหาวิทยาลัย ข\n\nรางวัลบทความดีเด่นระดับนักศึกษา (Best Student Paper Award):\n1. \"Quantum-inspired Optimization for Resource Allocation\" โดย นาย ต. ตะวันฉาย นักศึกษาปริญญาเอก มหาวิทยาลัย ง\n\nผู้ได้รับรางวัลจะได้รับเงินรางวัล ใบประกาศเกียรติคุณ และโอกาสตีพิมพ์ในวารสาร ECTI Transactions ฉบับพิเศษ",
    body_en:
      "ECTI Association congratulates the Best Paper Award winners from the ECTI-CON 2025 conference.\n\nBest Paper Award:\n1. \"Deep Learning-based Anomaly Detection in 5G Networks\" by Dr. T. Thanandon from University C\n2. \"Energy-Efficient Edge Computing for IoT Applications\" by Dr. D. Duangkamol from University B\n\nBest Student Paper Award:\n1. \"Quantum-inspired Optimization for Resource Allocation\" by Mr. T. Tawanchai, PhD student at University D\n\nWinners receive a cash prize, certificate of recognition, and the opportunity to publish an extended version in a special issue of ECTI Transactions.",
    date: "2025-10-15",
    date_th: "15 ตุลาคม 2568",
    date_en: "October 15, 2025",
    tags: ["awards"],
    readTimeMin: 3,
  },
  {
    slug: "ecti-eec-special-issue-ai",
    title_th: "ECTI-EEC เปิดรับบทความฉบับพิเศษด้าน AI",
    title_en: "ECTI-EEC Special Issue on AI Applications",
    summary_th:
      "วารสาร ECTI-EEC เปิดรับบทความสำหรับฉบับพิเศษด้านการประยุกต์ใช้ปัญญาประดิษฐ์",
    summary_en:
      "ECTI-EEC journal opens submissions for a special issue on AI applications in engineering.",
    body_th:
      "วารสาร ECTI Transactions on Electrical Engineering, Electronics, and Communications (ECTI-EEC) เปิดรับบทความวิจัยสำหรับฉบับพิเศษ \"AI Applications in Electrical Engineering and Communications\"\n\nหัวข้อที่สนใจ:\n- การประยุกต์ใช้ Deep Learning ในระบบสื่อสาร\n- AI สำหรับการออกแบบวงจรและระบบ VLSI\n- Machine Learning สำหรับระบบพลังงานอัจฉริยะ\n- AI-driven Signal Processing\n- Reinforcement Learning สำหรับระบบอัตโนมัติ\n\nกำหนดส่ง: 30 มิถุนายน 2569\nGuest Editor: ศ.ดร. ฐ. ฐานันดร, มหาวิทยาลัย ค",
    body_en:
      "ECTI Transactions on Electrical Engineering, Electronics, and Communications (ECTI-EEC) is accepting submissions for a special issue on \"AI Applications in Electrical Engineering and Communications.\"\n\nTopics of Interest:\n- Deep Learning applications in communication systems\n- AI for circuit design and VLSI systems\n- Machine Learning for smart energy systems\n- AI-driven Signal Processing\n- Reinforcement Learning for autonomous systems\n\nSubmission Deadline: June 30, 2026\nGuest Editor: Prof. Dr. T. Thanandon, University C",
    date: "2026-02-15",
    date_th: "15 กุมภาพันธ์ 2569",
    date_en: "February 15, 2026",
    tags: ["cfp", "publications"],
    readTimeMin: 2,
  },
  {
    slug: "ecti-young-researcher-program",
    title_th: "โครงการนักวิจัยรุ่นใหม่ ECTI 2026",
    title_en: "ECTI Young Researcher Program 2026",
    summary_th:
      "เปิดรับสมัครโครงการสนับสนุนนักวิจัยรุ่นใหม่ด้านวิศวกรรมไฟฟ้าและเทคโนโลยีสารสนเทศ",
    summary_en:
      "Applications open for the young researcher support program in EE and IT fields.",
    body_th:
      "สมาคม ECTI เปิดรับสมัครโครงการนักวิจัยรุ่นใหม่ ECTI ประจำปี 2569 เพื่อสนับสนุนนักวิจัยที่มีอายุไม่เกิน 35 ปี ในสาขาวิศวกรรมไฟฟ้า อิเล็กทรอนิกส์ คอมพิวเตอร์ โทรคมนาคม และสารสนเทศ\n\nสิทธิประโยชน์:\n- ทุนวิจัยมูลค่า 100,000 บาท\n- การเข้าร่วมประชุม ECTI-CON 2026 โดยไม่เสียค่าลงทะเบียน\n- โอกาสนำเสนอผลงานในเซสชันพิเศษ\n- เครือข่ายที่ปรึกษาจากนักวิจัยอาวุโส\n\nคุณสมบัติ:\n- อายุไม่เกิน 35 ปี ณ วันสมัคร\n- เป็นสมาชิกสมาคม ECTI\n- มีผลงานวิจัยตีพิมพ์อย่างน้อย 2 บทความ\n\nเปิดรับสมัคร: วันนี้ - 31 มีนาคม 2569",
    body_en:
      "ECTI Association opens applications for the ECTI Young Researcher Program 2026, supporting researchers under 35 years old in Electrical Engineering/Electronics, Computer, Telecommunications, and IT fields.\n\nBenefits:\n- Research grant of 100,000 THB\n- Free registration for ECTI-CON 2026\n- Opportunity to present at a special session\n- Mentorship network from senior researchers\n\nEligibility:\n- Under 35 years old at the time of application\n- Active ECTI member\n- Minimum 2 published research papers\n\nApplication Period: Now - March 31, 2026",
    date: "2026-01-20",
    date_th: "20 มกราคม 2569",
    date_en: "January 20, 2026",
    tags: ["community", "awards"],
    author: "ECTI Young Researcher Committee",
    readTimeMin: 3,
  },
  {
    slug: "ecti-dacon-2026-announcement",
    title_th: "ประกาศจัดประชุม ECTI-DACON 2026",
    title_en: "ECTI-DACON 2026 Conference Announced",
    summary_th:
      "การประชุมวิชาการด้านวิทยาการข้อมูลและการสื่อสาร ครั้งที่ 3 ณ มหาวิทยาลัยสงขลานครินทร์",
    summary_en:
      "The 3rd ECTI Data Science and Communications Conference at Prince of Songkla University.",
    body_th:
      "สมาคม ECTI ร่วมกับมหาวิทยาลัยสงขลานครินทร์ประกาศจัดการประชุมวิชาการ ECTI-DACON 2026 ครั้งที่ 3 ระหว่างวันที่ 20-22 สิงหาคม 2569 ณ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่\n\nECTI-DACON เป็นเวทีการประชุมวิชาการที่เน้นงานวิจัยด้านวิทยาการข้อมูล การเรียนรู้ของเครื่อง และระบบสื่อสารสมัยใหม่ การประชุมเปิดรับบทความวิจัยในหัวข้อ Big Data Analytics, NLP, Computer Vision, Wireless Communications และ Network Security\n\nกำหนดส่งบทความ: 1 มิถุนายน 2569\nแจ้งผลพิจารณา: 15 กรกฎาคม 2569",
    body_en:
      "ECTI Association and Prince of Songkla University announce the 3rd ECTI Data Science and Communications Conference (ECTI-DACON 2026), to be held August 20-22, 2026 at Prince of Songkla University, Hat Yai Campus.\n\nECTI-DACON is a research conference focused on data science, machine learning, and modern communication systems. The conference welcomes papers on Big Data Analytics, NLP, Computer Vision, Wireless Communications, and Network Security.\n\nPaper Submission Deadline: June 1, 2026\nNotification: July 15, 2026",
    date: "2026-02-10",
    date_th: "10 กุมภาพันธ์ 2569",
    date_en: "February 10, 2026",
    tags: ["announcements", "cfp"],
    readTimeMin: 2,
  },
];*/

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | undefined> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news-posts?filters[slug][$eq]=${slug}&populate=tags`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return undefined;
  const json = await res.json();
  if (!json.data?.length) return undefined;
  const item = json.data[0];
  return {
    id: item.id,
    slug: item.slug,
    title_th: item.title ?? "",
    title_en: item.title_en ?? "",
    summary_th: item.summary ?? "",
    summary_en: item.summary_en ?? "",
    body: item.body ?? [],
    body_en: item.body_en ?? [],
    date: item.date ?? "",
    tags: (item.tags ?? []).map((t: any) => t.name_en as NewsTag),
    author: item.author ?? undefined,
    readTimeMin: item.read_time_min ?? 1,
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  tags: NewsTag[],
  limit = 3
): Promise<NewsPost[]> {
  const all = await getNewsPosts();
  return all
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}

export function getAllTags(): NewsTag[] {
  return ["announcements", "cfp", "awards", "publications", "community"];
}
