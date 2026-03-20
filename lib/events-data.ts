export type EventStatus = "open" | "register" | "upcoming" | "finished";
export type EventType = "conference" | "workshop" | "seminar";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const API_URL = `${BASE_URL}/api/activities?populate=*`;

console.log("API_URL =", API_URL);

export interface EventDeadline {
  label_th: string;
  label_en: string;
  date_th: string;
  date_en: string;
}

export interface EventTrack {
  name_th: string;
  name_en: string;
}

export interface EventButton {
  url: string;
  type: string;
}

export interface ECTIEvent {
  slug: string;
  title: string;
  title_en?: string;
  date_th: string;
  date_en: string;
  location_th: string;
  location_en: string;
  description_th: string;
  description_en: string;
  overview_th: string;
  overview_en: string;
  status: EventStatus;
  type: EventType;
  year: string;
  deadlines: EventDeadline[];
  tracks: EventTrack[];
  topics: string[];
  organizer: string;
  register_url: string;
}

//fetch by slug
export async function fetchEventBySlug(slug: string) {
  const res = await fetch(`${API_URL}?filters[slug][$eq]=${slug}`,
    { cache: "no-store" }
  );

  const json = await res.json();

  console.log("FETCH BY SLUG =", json);

  if (!json || !Array.isArray(json.data) || json.data.length === 0) {
    return null;
  }

  const item = json.data[0];
  return item;
}


// func fetch
export async function fetchEventsFromAPI(): Promise<ECTIEvent[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  const json = await res.json();

  if (!json || !Array.isArray(json.data)) {
    console.warn("fetchEventsFromAPI: Invalid data received", json);
    return [];
  }

  return json.data.map((item: any) => {
    const attr = item;

    return {
      slug: item.documentId || item.id.toString(),
      title: attr.title,
      title_en: attr.title_en,

      date_th: formatDateTH(attr.event_start_date),
      date_en: formatDateEN(attr.event_start_date),

      location_th: attr.location,
      location_en: attr.location_en,

      description_th: attr.description?.[0]?.children?.[0]?.text || "",
      description_en: attr.description_en?.[0]?.children?.[0]?.text || "",

      overview_th: "",
      overview_en: "",

      status: attr.event_status,
      type: attr.type,
      year: attr.year,

      deadlines:
        attr.deadline?.map((d: any) => ({
          label_th: d.title,
          label_en: d.title,
          date_th: formatDateTH(d.date),
          date_en: formatDateEN(d.date),
        })) || [],

      tracks: [],
      topics: [],
      organizer: "",
      register_url: attr.register_url || "",
    };
  });
}

//ทำให้ตรงตาม format วันที่ของจารย์
function formatDateEN(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTH(date: string) {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


export const events: ECTIEvent[] = [
  {
    slug: "ecti-con-2026",
    title: "ECTI-CON 2026",
    date_th: "9-12 กรกฎาคม 2569",
    date_en: "July 9-12, 2026",
    location_th: "โรงแรมเลอ เมอริเดียน เชียงใหม่",
    location_en: "Le Meridien Chiang Mai, Thailand",
    description_th:
      "การประชุมวิชาการนานาชาติด้านวิศวกรรมไฟฟ้า/อิเล็กทรอนิกส์ คอมพิวเตอร์ โทรคมนาคม และสารสนเทศ ครั้งที่ 23",
    description_en:
      "The 23rd International Conference on Electrical Engineering/Electronics, Computer, Telecommunications and Information Technology",
    overview_th:
      "ECTI-CON 2026 เป็นการประชุมวิชาการนานาชาติประจำปีที่จัดโดยสมาคม ECTI เปิดรับบทความวิจัยคุณภาพสูงในสาขาวิศวกรรมไฟฟ้า อิเล็กทรอนิกส์ คอมพิวเตอร์ โทรคมนาคม และสารสนเทศ โดยบทความที่ได้รับคัดเลือกจะถูกตีพิมพ์ใน IEEE Xplore และวารสาร ECTI Transactions",
    overview_en:
      "ECTI-CON 2026 is the annual flagship international conference organized by ECTI Association. It welcomes high-quality research papers in Electrical Engineering/Electronics, Computer, Telecommunications, and Information Technology. Accepted papers will be published in IEEE Xplore and ECTI Transactions journals.",
    status: "open",
    type: "conference",
    year: "2026",
    deadlines: [
      {
        label_th: "กำหนดส่งบทความ",
        label_en: "Paper Submission",
        date_th: "30 เมษายน 2569",
        date_en: "April 30, 2026",
      },
      {
        label_th: "แจ้งผลพิจารณา",
        label_en: "Notification",
        date_th: "31 พฤษภาคม 2569",
        date_en: "May 31, 2026",
      },
      {
        label_th: "ส่งฉบับสมบูรณ์",
        label_en: "Camera Ready",
        date_th: "15 มิถุนายน 2569",
        date_en: "June 15, 2026",
      },
      {
        label_th: "ลงทะเบียนล่วงหน้า",
        label_en: "Early Bird Registration",
        date_th: "20 มิถุนายน 2569",
        date_en: "June 20, 2026",
      },
    ],
    tracks: [
      { name_th: "วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์", name_en: "Electrical Engineering & Electronics" },
      { name_th: "วิทยาการคอมพิวเตอร์และ AI", name_en: "Computer Science & AI" },
      { name_th: "โทรคมนาคมและเครือข่าย", name_en: "Telecommunications & Networking" },
      { name_th: "เทคโนโลยีสารสนเทศ", name_en: "Information Technology" },
      { name_th: "การประมวลผลสัญญาณ", name_en: "Signal Processing" },
    ],
    topics: [
      "Artificial Intelligence & Machine Learning",
      "6G Communications",
      "Quantum Computing",
      "IoT & Embedded Systems",
      "Cybersecurity",
      "Robotics & Automation",
      "Image & Video Processing",
      "VLSI & Circuit Design",
    ],
    organizer: "ECTI Association & Chiang Mai University",
    register_url: "",
  },
  {
    slug: "ecti-card-2026",
    title: "ECTI-CARD 2026",
    date_th: "8-10 พฤษภาคม 2569",
    date_en: "May 8-10, 2026",
    location_th: "มหาวิทยาลัยเชียงใหม่",
    location_en: "Chiang Mai University, Thailand",
    description_th:
      "การประชุมวิชาการ ECTI Conference on Application Research and Development ครั้งที่ 5",
    description_en:
      "The 5th ECTI Conference on Application Research and Development",
    overview_th:
      "ECTI-CARD 2026 เป็นเวทีสำหรับนำเสนอผลงานวิจัยประยุกต์และการพัฒนาเทคโนโลยีในสาขาที่เกี่ยวข้อง เน้นการเชื่อมโยงผลงานวิจัยสู่การใช้งานจริง",
    overview_en:
      "ECTI-CARD 2026 provides a platform for presenting applied research and technology development in related fields, emphasizing the bridge between research and real-world applications.",
    status: "register",
    type: "conference",
    year: "2026",
    deadlines: [
      {
        label_th: "กำหนดส่งบทความ",
        label_en: "Paper Submission",
        date_th: "15 มีนาคม 2569",
        date_en: "March 15, 2026",
      },
      {
        label_th: "แจ้งผลพิจารณา",
        label_en: "Notification",
        date_th: "10 เมษายน 2569",
        date_en: "April 10, 2026",
      },
      {
        label_th: "ลงทะเบียน",
        label_en: "Registration",
        date_th: "25 เมษายน 2569",
        date_en: "April 25, 2026",
      },
    ],
    tracks: [
      { name_th: "ระบบฝังตัวและ IoT", name_en: "Embedded Systems & IoT" },
      { name_th: "การประยุกต์ AI", name_en: "AI Applications" },
      { name_th: "เทคโนโลยีพลังงาน", name_en: "Energy Technology" },
    ],
    topics: [
      "Smart Agriculture",
      "Healthcare Technology",
      "Smart City Applications",
      "Renewable Energy Systems",
      "Industrial IoT",
    ],
    organizer: "ECTI Association & Chiang Mai University",
    register_url: "",
  },
  {
    slug: "ai-iot-workshop-2026",
    title: "AI/IoT Workshop 2026",
    date_th: "15 มีนาคม 2569",
    date_en: "March 15, 2026",
    location_th: "จุฬาลงกรณ์มหาวิทยาลัย กรุงเทพฯ",
    location_en: "Chulalongkorn University, Bangkok",
    description_th:
      "สัมมนาเชิงปฏิบัติการเกี่ยวกับปัญญาประดิษฐ์และอินเทอร์เน็ตในทุกสิ่ง สำหรับสมาชิกสมาคม",
    description_en:
      "Hands-on workshop on Artificial Intelligence and Internet of Things for association members",
    overview_th:
      "สัมมนาเชิงปฏิบัติการ 1 วัน ครอบคลุมพื้นฐาน AI/ML, การใช้ TensorFlow และ PyTorch, การพัฒนาระบบ IoT ด้วย ESP32 และ Raspberry Pi พร้อมโปรเจกต์จริง",
    overview_en:
      "A one-day hands-on workshop covering AI/ML fundamentals, TensorFlow and PyTorch usage, IoT development with ESP32 and Raspberry Pi, with real project demonstrations.",
    status: "finished",
    type: "workshop",
    year: "2026",
    deadlines: [
      {
        label_th: "ลงทะเบียน",
        label_en: "Registration",
        date_th: "1 มีนาคม 2569",
        date_en: "March 1, 2026",
      },
    ],
    tracks: [
      { name_th: "ปัญญาประดิษฐ์", name_en: "Artificial Intelligence" },
      { name_th: "อินเทอร์เน็ตในทุกสิ่ง", name_en: "Internet of Things" },
    ],
    topics: [
      "Deep Learning",
      "Edge AI",
      "Sensor Networks",
      "Smart Home",
    ],
    organizer: "ECTI Association & Chulalongkorn University",
    register_url: "",
  },
  {
    slug: "ecti-con-2025",
    title: "ECTI-CON 2025",
    date_th: "25-28 มิถุนายน 2568",
    date_en: "June 25-28, 2025",
    location_th: "โรงแรมอมารี วอเตอร์เกท กรุงเทพฯ",
    location_en: "Amari Watergate, Bangkok, Thailand",
    description_th:
      "การประชุมวิชาการนานาชาติ ECTI ครั้งที่ 22 ณ กรุงเทพมหานคร",
    description_en:
      "The 22nd ECTI International Conference held in Bangkok",
    overview_th:
      "ECTI-CON 2025 ประสบความสำเร็จด้วยผู้เข้าร่วมกว่า 500 คนจาก 15 ประเทศ มีการนำเสนอบทความวิจัยกว่า 200 บทความ",
    overview_en:
      "ECTI-CON 2025 was a great success with over 500 participants from 15 countries and more than 200 research paper presentations.",
    status: "finished",
    type: "conference",
    year: "2025",
    deadlines: [],
    tracks: [
      { name_th: "วิศวกรรมไฟฟ้า", name_en: "Electrical Engineering" },
      { name_th: "วิทยาการคอมพิวเตอร์", name_en: "Computer Science" },
      { name_th: "โทรคมนาคม", name_en: "Telecommunications" },
      { name_th: "เทคโนโลยีสารสนเทศ", name_en: "Information Technology" },
    ],
    topics: [
      "5G/6G Communications",
      "AI & Deep Learning",
      "Blockchain",
      "Cloud Computing",
      "Edge Computing",
    ],
    organizer: "ECTI Association & KMUTNB",
    register_url: "",
  },
  {
    slug: "quantum-computing-seminar-2025",
    title: "Quantum Computing Seminar",
    date_th: "10 ตุลาคม 2568",
    date_en: "October 10, 2025",
    location_th: "มหาวิทยาลัยเกษตรศาสตร์ กรุงเทพฯ",
    location_en: "Kasetsart University, Bangkok",
    description_th:
      "สัมมนาพิเศษเรื่องการประมวลผลควอนตัมและผลกระทบต่อวงการวิศวกรรม",
    description_en:
      "Special seminar on Quantum Computing and its impact on the engineering field",
    overview_th:
      "สัมมนาครึ่งวันโดยผู้เชี่ยวชาญด้านการประมวลผลควอนตัมจากมหาวิทยาลัยชั้นนำ ครอบคลุมทฤษฎีพื้นฐาน, อัลกอริทึมควอนตัม, และการประยุกต์ใช้งานจริง",
    overview_en:
      "A half-day seminar by quantum computing experts from leading universities, covering fundamental theory, quantum algorithms, and real-world applications.",
    status: "finished",
    type: "seminar",
    year: "2025",
    deadlines: [],
    tracks: [
      { name_th: "การประมวลผลควอนตัม", name_en: "Quantum Computing" },
    ],
    topics: [
      "Quantum Algorithms",
      "Quantum Error Correction",
      "Quantum Machine Learning",
    ],
    organizer: "ECTI Association & Kasetsart University",
    register_url: "",
  },
  {
    slug: "ecti-dacon-2026",
    title: "ECTI-DACON 2026",
    date_th: "20-22 สิงหาคม 2569",
    date_en: "August 20-22, 2026",
    location_th: "มหาวิทยาลัยสงขลานครินทร์ หาดใหญ่",
    location_en: "Prince of Songkla University, Hat Yai",
    description_th:
      "การประชุมวิชาการด้านวิทยาการข้อมูลและการสื่อสาร ครั้งที่ 3",
    description_en:
      "The 3rd ECTI Data Science and Communications Conference",
    overview_th:
      "ECTI-DACON 2026 เป็นเวทีการประชุมวิชาการที่เน้นงานวิจัยด้านวิทยาการข้อมูล การเรียนรู้ของเครื่อง และระบบสื่อสารสมัยใหม่",
    overview_en:
      "ECTI-DACON 2026 is an academic conference focused on data science, machine learning, and modern communication systems research.",
    status: "upcoming",
    type: "conference",
    year: "2026",
    deadlines: [
      {
        label_th: "กำหนดส่งบทความ",
        label_en: "Paper Submission",
        date_th: "1 มิถุนายน 2569",
        date_en: "June 1, 2026",
      },
      {
        label_th: "แจ้งผลพิจารณา",
        label_en: "Notification",
        date_th: "15 กรกฎาคม 2569",
        date_en: "July 15, 2026",
      },
      {
        label_th: "ลงทะเบียนล่วงหน้า",
        label_en: "Early Bird Registration",
        date_th: "1 สิงหาคม 2569",
        date_en: "August 1, 2026",
      },
    ],
    tracks: [
      { name_th: "วิทยาการข้อมูล", name_en: "Data Science" },
      { name_th: "การเรียนรู้ของเครื่อง", name_en: "Machine Learning" },
      { name_th: "ระบบสื่อสาร", name_en: "Communication Systems" },
    ],
    topics: [
      "Big Data Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Wireless Communications",
      "Network Security",
    ],
    organizer: "ECTI Association & Prince of Songkla University",
    register_url: "",
  },
];

export function getEventBySlug(slug: string): ECTIEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUniqueYears(): string[] {
  return [...new Set(events.map((e) => String(e.year)))].sort((a, b) => Number(b) - Number(a));
}

export function getUniqueLocations(locale: "th" | "en"): string[] {
  const key = locale === "th" ? "location_th" : "location_en";
  return [...new Set(events.map((e) => e[key]))].sort();
}

/*create func fetch ของจารย์
export async function fetchEvents(): Promise<ECTIEvent[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data.map((item: any) => {
    const attr = item;

    return {
      slug: item.documentId || item.id.toString(),
      title: attr.title,

      date_th: attr.event_start_date,
      date_en: attr.event_start_date,

      location_th: attr.location,
      location_en: attr.location,

      description_th: "",
      description_en: "",

      overview_th: "",
      overview_en: "",

      status: attr.event_status,
      type: attr.type,
      year: attr.year,

      deadlines:
        attr.deadline?.map((d: any) => ({
          label_th: d.title,
          label_en: d.title,
          date_th: d.date,
          date_en: d.date,
        })) || [],

      tracks: [],
      topics: [],
      organizer: "",
    };
  });
} */
