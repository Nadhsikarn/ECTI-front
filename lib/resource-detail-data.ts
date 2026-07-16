/**
 * Static data for the Resources detail sub-pages (issue #28).
 * Content migrated from the legacy site https://ecti-thailand.org/.
 *
 * `href` is either a local file under /public (self-hosted, downloadable)
 * or an external URL (`external: true`, opens in a new tab).
 * External old-site PDFs were health-checked; dead links (HTTP 404) were dropped.
 * Swap any `href` to a CMS/storage URL later without touching the pages.
 */

export interface ResourceItem {
  /** Display title (Thai unless the source is English) */
  title: string;
  /** Optional English title */
  titleEn?: string;
  /** Local /public path (downloadable) or external URL */
  href: string;
  /** true = external site (new tab); false/undefined = same-origin download */
  external?: boolean;
  /** Short description / subtitle */
  description?: string;
  /** Small meta line, e.g. period or file info */
  meta?: string;
}

/** กล่อง 1 — เอกสารของสมาคม
 *  ใช้เป็น fallback (ลิงก์เว็บเก่า) จนกว่าจะอัปโหลดไฟล์เข้า Strapi (ดู lib/documents-data.ts) */
export const associationDocuments: ResourceItem[] = [
  { title: "ข้อบังคับสมาคม (ฉบับวันที่ 8 มีนาคม 2567)", titleEn: "Association Bylaws (8 Mar 2024)", href: "https://ecti-thailand.org/wp-content/uploads/2024/03/%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%9A%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%B1%E0%B8%9A%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88-8-%E0%B8%A1%E0%B8%B5%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%A1-2567-%E0%B8%AA%E0%B8%84-51.pdf", external: true, meta: "PDF · 2.4 MB" },
  { title: "แบบฟอร์มการเบิกเงิน", titleEn: "Reimbursement Form", href: "https://ecti-thailand.org/wp-content/uploads/2024/03/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%9F%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%81%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.pdf", external: true, meta: "PDF · 183 KB" },
  { title: "ใบรับรองแทนใบเสร็จรับเงิน (2566)", titleEn: "Receipt Substitute Certificate (2023)", href: "https://ecti-thailand.org/wp-content/uploads/2023/10/%E0%B9%83%E0%B8%9A%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%97%E0%B8%99%E0%B9%83%E0%B8%9A%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B9%87%E0%B8%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99_2566.pdf", external: true, meta: "PDF · 67 KB" },
  { title: "ใบสำคัญรับเงิน ECTI (2566)", titleEn: "Payment Voucher (2023)", href: "https://ecti-thailand.org/wp-content/uploads/2023/10/%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99-ECTI_-2566.pdf", external: true, meta: "PDF · 81 KB" },
  { title: "ใบสำคัญยืมเงิน ECTI", titleEn: "Loan Voucher", href: "https://ecti-thailand.org/wp-content/uploads/2024/03/%E0%B9%83%E0%B8%9A%E0%B8%AA%E0%B8%B3%E0%B8%84%E0%B8%B1%E0%B8%8D%E0%B8%A2%E0%B8%B7%E0%B8%A1%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99ECTI.doc.pdf", external: true, meta: "PDF · 123 KB" },
];

/** กล่อง 2 — ลิงก์ที่เกี่ยวข้อง (E-book จากสมาชิก ECTI) */
export const memberEbooks: ResourceItem[] = [
  {
    title: "e-Book โดย ศ.ดร.ปิยะ โควินท์ทวีวัฒน์",
    titleEn: "e-Book by Prof. Piya Kovintavewat",
    href: "https://pws.npru.ac.th/piya/index.php?act=6a992d5529f459a44fee58c733255e86&lntype=editor_top&stm_id=9938",
    external: true,
    description: "หนังสืออิเล็กทรอนิกส์ฟรีจากสมาชิกสมาคม ECTI",
  },
];

/** กล่อง 3a — E-Magazine (นิตยสาร ECTI ย้อนหลัง) */
export const eMagazines: ResourceItem[] = [
  { title: "นิตยสาร ECTI ปีที่ 12 ฉบับที่ 3", titleEn: "ECTI E-Magazine Vol. 12 No. 3", href: "https://ecti-thailand.org/wp-content/uploads/2019/03/MagazineJulSep2018.pdf", external: true, meta: "ก.ค.–ก.ย. 2561" },
  { title: "นิตยสาร ECTI ปีที่ 12 ฉบับที่ 2", titleEn: "ECTI E-Magazine Vol. 12 No. 2", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineAprJun2018.pdf", external: true, meta: "เม.ย.–มิ.ย. 2561" },
  { title: "นิตยสาร ECTI ปีที่ 12 ฉบับที่ 1", titleEn: "ECTI E-Magazine Vol. 12 No. 1", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJanMar2018-1.pdf", external: true, meta: "ม.ค.–มี.ค. 2561" },
  { title: "นิตยสาร ECTI ปีที่ 11 ฉบับที่ 4", titleEn: "ECTI E-Magazine Vol. 11 No. 4", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineOctDec2017.pdf", external: true, meta: "ต.ค.–ธ.ค. 2560" },
  { title: "นิตยสาร ECTI ปีที่ 11 ฉบับที่ 3", titleEn: "ECTI E-Magazine Vol. 11 No. 3", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJulSep2017.pdf", external: true, meta: "ก.ค.–ก.ย. 2560" },
  { title: "นิตยสาร ECTI ปีที่ 11 ฉบับที่ 2", titleEn: "ECTI E-Magazine Vol. 11 No. 2", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineAprJun2017.pdf", external: true, meta: "เม.ย.–มิ.ย. 2560" },
  { title: "นิตยสาร ECTI ปีที่ 11 ฉบับที่ 1", titleEn: "ECTI E-Magazine Vol. 11 No. 1", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJanMar2017.pdf", external: true, meta: "ม.ค.–มี.ค. 2560" },
  { title: "นิตยสาร ECTI ปีที่ 10 ฉบับที่ 4", titleEn: "ECTI E-Magazine Vol. 10 No. 4", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineOctDec2016.pdf", external: true, meta: "ต.ค.–ธ.ค. 2559" },
  { title: "นิตยสาร ECTI ปีที่ 10 ฉบับที่ 3", titleEn: "ECTI E-Magazine Vol. 10 No. 3", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJulSep2016.pdf", external: true, meta: "ก.ค.–ก.ย. 2559" },
  { title: "นิตยสาร ECTI ปีที่ 10 ฉบับที่ 2", titleEn: "ECTI E-Magazine Vol. 10 No. 2", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineAprJun2016.pdf", external: true, meta: "เม.ย.–มิ.ย. 2559" },
  { title: "นิตยสาร ECTI ปีที่ 10 ฉบับที่ 1", titleEn: "ECTI E-Magazine Vol. 10 No. 1", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJanMar2016.pdf", external: true, meta: "ม.ค.–มี.ค. 2559" },
  { title: "นิตยสาร ECTI ปีที่ 9 ฉบับที่ 4", titleEn: "ECTI E-Magazine Vol. 9 No. 4", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineOctDec2015.pdf", external: true, meta: "ต.ค.–ธ.ค. 2558" },
  { title: "นิตยสาร ECTI ปีที่ 9 ฉบับที่ 3", titleEn: "ECTI E-Magazine Vol. 9 No. 3", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJulSep2015.pdf", external: true, meta: "ก.ค.–ก.ย. 2558" },
  { title: "นิตยสาร ECTI ปีที่ 9 ฉบับที่ 2", titleEn: "ECTI E-Magazine Vol. 9 No. 2", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineAprJun2015.pdf", external: true, meta: "เม.ย.–มิ.ย. 2558" },
  { title: "นิตยสาร ECTI ปีที่ 9 ฉบับที่ 1", titleEn: "ECTI E-Magazine Vol. 9 No. 1", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJanMar2015.pdf", external: true, meta: "ม.ค.–มี.ค. 2558" },
  { title: "นิตยสาร ECTI ปีที่ 8 ฉบับที่ 4", titleEn: "ECTI E-Magazine Vol. 8 No. 4", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineOctDec2014.pdf", external: true, meta: "ต.ค.–ธ.ค. 2557" },
  { title: "นิตยสาร ECTI ปีที่ 8 ฉบับที่ 3", titleEn: "ECTI E-Magazine Vol. 8 No. 3", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJulSep2014.pdf", external: true, meta: "ก.ค.–ก.ย. 2557" },
  { title: "นิตยสาร ECTI ปีที่ 8 ฉบับที่ 2", titleEn: "ECTI E-Magazine Vol. 8 No. 2", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineAprJun2014.pdf", external: true, meta: "เม.ย.–มิ.ย. 2557" },
  { title: "นิตยสาร ECTI ปีที่ 8 ฉบับที่ 1", titleEn: "ECTI E-Magazine Vol. 8 No. 1", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineJanMar2014.pdf", external: true, meta: "ม.ค.–มี.ค. 2557" },
  { title: "นิตยสาร ECTI ปีที่ 7 ฉบับที่ 4", titleEn: "ECTI E-Magazine Vol. 7 No. 4", href: "https://ecti-thailand.org/wp-content/uploads/2020/08/MagazineOctDec2013.pdf", external: true, meta: "ต.ค.–ธ.ค. 2556" },
];

/** กล่อง 3b — วารสาร ECTI เพื่ออุตสาหกรรม (URL เข้ารหัส %-encoded กันปัญหา Thai path)
 *  ใช้เป็น fallback จนกว่าจะอัปโหลดไฟล์เข้า Strapi (ดู lib/archive-data.ts) */
export const industryJournals: ResourceItem[] = [
  { title: "วารสาร ECTI เพื่ออุตสาหกรรม ฉบับที่ 6", titleEn: "ECTI Journal for Industry No. 6", href: "https://ecti-thailand.org/wp-content/uploads/2019/10/%E0%B8%A7%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%A3-ECTI-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%B8%E0%B8%95%E0%B8%AA%E0%B8%B2%E0%B8%AB%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-6.pdf", external: true, meta: "PDF" },
  { title: "วารสาร ECTI เพื่ออุตสาหกรรม ฉบับที่ 5", titleEn: "ECTI Journal for Industry No. 5", href: "https://ecti-thailand.org/wp-content/uploads/2019/07/%E0%B8%A7%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%A3-ECTI-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%B8%E0%B8%95%E0%B8%AA%E0%B8%B2%E0%B8%AB%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-5.pdf", external: true, meta: "PDF" },
  { title: "วารสาร ECTI เพื่ออุตสาหกรรม ฉบับที่ 4", titleEn: "ECTI Journal for Industry No. 4", href: "https://ecti-thailand.org/wp-content/uploads/2019/07/%E0%B8%A7%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%A3-ECTI-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%B8%E0%B8%95%E0%B8%AA%E0%B8%B2%E0%B8%AB%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-4v2.pdf", external: true, meta: "PDF" },
  { title: "วารสาร ECTI เพื่ออุตสาหกรรม ฉบับที่ 3", titleEn: "ECTI Journal for Industry No. 3", href: "https://ecti-thailand.org/wp-content/uploads/2019/07/%E0%B8%A7%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%A3-ECTI-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%B8%E0%B8%95%E0%B8%AA%E0%B8%B2%E0%B8%AB%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-3.pdf", external: true, meta: "PDF" },
  { title: "วารสาร ECTI เพื่ออุตสาหกรรม ฉบับที่ 2", titleEn: "ECTI Journal for Industry No. 2", href: "https://ecti-thailand.org/wp-content/uploads/2019/07/%E0%B8%A7%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%A3-ECTI-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%B8%E0%B8%95%E0%B8%AA%E0%B8%B2%E0%B8%AB%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%88-2.pdf", external: true, meta: "PDF" },
];
