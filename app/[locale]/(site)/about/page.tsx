import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BoardFilter } from "@/components/board-filter";
import { Target, Eye, ListChecks, Check } from "lucide-react";
import { getBoardMembers, getMilestones } from "@/lib/about-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.about.title,
    description: dict.about.description,
    openGraph: {
      title: dict.about.title,
      description: dict.about.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/about", en: "/en/about" } },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const isTh = locale === "th";


// mock data
/*  const timelineMilestones = [
    {
      year: "2003",
      title: isTh ? "ก่อตั้งสมาคม ECTI" : "ECTI Association Founded",
      desc: isTh
        ? "สมาคม ECTI ก่อตั้งขึ้นอย่างเป็นทางการโดยกลุ่มนักวิชาการชั้นนำด้านวิศวกรรมไฟฟ้าและสารสนเทศ"
        : "ECTI Association was officially established by leading academics in electrical engineering and IT.",
    },
    {
      year: "2004",
      title: isTh ? "ECTI-CON ครั้งแรก" : "First ECTI-CON",
      desc: isTh
        ? "จัดการประชุมวิชาการนานาชาติ ECTI-CON ครั้งที่ 1 ที่พัทยา"
        : "The 1st ECTI International Conference (ECTI-CON) was held in Pattaya.",
    },
    {
      year: "2006",
      title: isTh ? "เปิดตัว ECTI Transactions" : "ECTI Transactions Launched",
      desc: isTh
        ? "เริ่มตีพิมพ์วารสาร ECTI-EEC และ ECTI-CIT อย่างเป็นทางการ"
        : "Official publication of ECTI-EEC and ECTI-CIT Transactions journals began.",
    },
    {
      year: "2012",
      title: isTh ? "วารสารเข้า Scopus" : "Scopus Indexing",
      desc: isTh
        ? "วารสาร ECTI-EEC ได้รับการจัดเข้า Scopus database"
        : "ECTI-EEC journal was indexed in the Scopus database.",
    },
    {
      year: "2018",
      title: isTh ? "สมาชิกครบ 2,000 คน" : "2,000 Members Milestone",
      desc: isTh
        ? "จำนวนสมาชิกสมาคมเติบโตถึง 2,000 คน จากทั่วประเทศ"
        : "The association's membership grew to 2,000 members nationwide.",
    },
    {
      year: "2023",
      title: isTh ? "ครบรอบ 20 ปี" : "20th Anniversary",
      desc: isTh
        ? "สมาคมครบรอบ 20 ปี พร้อมจัดงาน ECTI-CON ครั้งที่ 20 ที่ จ.นครศรีธรรมราช"
        : "ECTI celebrated its 20th anniversary with the 20th ECTI-CON in Nakhon Si Thammarat.",
    },
    {
      year: "2026",
      title: isTh ? "สมาชิกกว่า 3,000 คน" : "3,000+ Members",
      desc: isTh
        ? "สมาคมเติบโตอย่างต่อเนื่องด้วยสมาชิกกว่า 3,000 คน และพันธมิตรนานาชาติ"
        : "The association continues to grow with 3,000+ members and international partnerships.",
    },
  ];*/

/*  const boardMembers = [
    { name: isTh ? "ศ.ดร. ก. กิตติคุณ" : "Prof. Dr. A. Kittikun", role: isTh ? "นายกสมาคม" : "President", institution: isTh ? "มหาวิทยาลัย ก" : "University A", committee: "exec" as const, image: "/images/people/person-a.jpg" },
    { name: isTh ? "รศ.ดร. ข. ขจรศักดิ์" : "Assoc. Prof. Dr. B. Kajornsak", role: isTh ? "อุปนายก" : "Vice President", institution: isTh ? "มหาวิทยาลัย ข" : "University B", committee: "exec" as const, image: "/images/people/person-b.jpg" },
    { name: isTh ? "ผศ.ดร. ค. คมสัน" : "Asst. Prof. Dr. C. Komsan", role: isTh ? "เลขาธิการ" : "Secretary", institution: isTh ? "มหาวิทยาลัย ค" : "University C", committee: "exec" as const, image: "/images/people/person-c.jpg" },
    { name: isTh ? "รศ.ดร. ง. งามจิตร" : "Assoc. Prof. Dr. D. Ngamjit", role: isTh ? "เหรัญญิก" : "Treasurer", institution: isTh ? "มหาวิทยาลัย ง" : "University D", committee: "exec" as const, image: "/images/people/person-d.jpg" },
    { name: isTh ? "ศ.ดร. จ. จรัสศรี" : "Prof. Dr. E. Jarassri", role: isTh ? "ประธานอนุกรรมการ" : "Chair", institution: isTh ? "มหาวิทยาลัย จ" : "University E", committee: "academic" as const, image: "/images/people/person-e.jpg" },
    { name: isTh ? "ผศ.ดร. ฉ. ฉัตรชัย" : "Asst. Prof. Dr. F. Chatchai", role: isTh ? "กรรมการ" : "Committee Member", institution: isTh ? "มหาวิทยาลัย ฉ" : "University F", committee: "academic" as const, image: "/images/people/person-f.jpg" },
    { name: isTh ? "รศ.ดร. ช. ชาญณรงค์" : "Assoc. Prof. Dr. G. Channarong", role: isTh ? "กรรมการ" : "Committee Member", institution: isTh ? "มหาวิทยาลัย ช" : "University G", committee: "academic" as const, image: "/images/people/person-g.jpg" },
    { name: isTh ? "ศ.ดร. ซ. เซียนศักดิ์" : "Prof. Dr. H. Siansak", role: isTh ? "บรรณาธิการ ECTI-EEC" : "Editor-in-Chief, ECTI-EEC", institution: isTh ? "มหาวิทยาลัย ซ" : "University H", committee: "publications" as const, image: "/images/people/person-h.jpg" },
    { name: isTh ? "รศ.ดร. ฌ. เฌอศิริ" : "Assoc. Prof. Dr. I. Chersiri", role: isTh ? "บรรณาธิการ ECTI-CIT" : "Editor-in-Chief, ECTI-CIT", institution: isTh ? "มหาวิทยาลัย ฌ" : "University I", committee: "publications" as const, image: "/images/people/person-i.jpg" },
    { name: isTh ? "ผศ.ดร. ญ. ญาณวุฒิ" : "Asst. Prof. Dr. J. Yanawut", role: isTh ? "ผู้ช่วยบรรณาธิการ" : "Associate Editor", institution: isTh ? "มหาวิทยาลัย ญ" : "University J", committee: "publications" as const, image: "/images/people/person-j.jpg" },
  ];*/

  const [rawMembers, rawMilestones] = await Promise.all([
    getBoardMembers(),
    getMilestones(),
  ]);

  const timelineMilestones = rawMilestones.map((m) => ({
    year: m.year,
    title: isTh ? m.title : m.title_en,
    desc: isTh ? m.description : m.description_en,
  }));

  const boardMembers = rawMembers.map((m) => ({
    name: isTh ? m.name : m.name_en,
    role: isTh ? m.role : m.role_en,
    institution: isTh ? m.institution : m.institution_en,
    committee: m.committee,
    image: m.image
      ? m.image.url  // ใช้ URL ตรงๆ เลย ไม่ต้องต่อ env
      : "/images/placeholder.jpg",
  }));

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.about.title}
        description={dict.about.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.about.title }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* --- Mission & Vision --- */}
        <section className="mb-20 grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <Card className="border-border">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {dict.about.missionTitle}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {dict.about.missionText}
              </p>
            </CardContent>
          </Card>
          {/* Vision */}
          <Card className="border-border">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {dict.about.visionTitle}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {dict.about.visionText}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* --- Objectives --- */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ListChecks className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {dict.about.objectivesTitle}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {dict.about.objectives.map((obj) => (
              <div
                key={obj}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground">
                  {obj}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-20" />

        {/* --- Timeline Milestones --- */}
        <section className="mb-20">
          <h2 className="mb-10 text-2xl font-bold text-foreground md:text-3xl">
            {dict.about.timelineTitle}
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:block"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-8">
              {timelineMilestones.map((item, i) => (
                <div key={i} className="relative flex gap-6 md:gap-8">
                  {/* Year dot */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-sm font-bold text-primary">
                      {item.year.slice(2)}
                    </div>
                  </div>
                  {/* Content */}
                  <Card className="flex-1 border-border">
                    <CardContent className="p-5">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.year}
                      </div>
                      <h3 className="mb-2 text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* --- Board & Committees --- */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
            {dict.about.boardTitle}
          </h2>
          <BoardFilter
            members={boardMembers}
            labels={{
              all: dict.about.boardFilterAll,
              exec: dict.about.boardFilterExec,
              academic: dict.about.boardFilterAcademic,
              publications: dict.about.boardFilterPublications,
            }}
          />
        </section>
      </div>
    </>
  );
}
