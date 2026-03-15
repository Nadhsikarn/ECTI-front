import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Dictionary, Locale } from "@/lib/i18n";

interface MemberSpotlightSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const members = [
  {
    name: { th: "ศ.ดร. ก. กิตติคุณ", en: "Prof. A. Kittikun" },
    role: { th: "มหาวิทยาลัย ก", en: "University A" },
    area: { th: "ปัญญาประดิษฐ์", en: "Artificial Intelligence" },
    image: "/images/people/person-a.jpg",
  },
  {
    name: { th: "รศ.ดร. ข. ขจรศักดิ์", en: "Assoc. Prof. B. Kajornsak" },
    role: { th: "มหาวิทยาลัย ข", en: "University B" },
    area: { th: "โทรคมนาคม", en: "Telecommunications" },
    image: "/images/people/person-b.jpg",
  },
  {
    name: { th: "ผศ.ดร. ค. คมสัน", en: "Asst. Prof. C. Komsan" },
    role: { th: "มหาวิทยาลัย ค", en: "University C" },
    area: { th: "อิเล็กทรอนิกส์", en: "Electronics" },
    image: "/images/people/person-c.jpg",
  },
  {
    name: { th: "ศ.ดร. ง. งามจิตร", en: "Prof. D. Ngamjit" },
    role: { th: "มหาวิทยาลัย ง", en: "University D" },
    area: { th: "วิทยาการคอมพิวเตอร์", en: "Computer Science" },
    image: "/images/people/person-d.jpg",
  },
  {
    name: { th: "รศ.ดร. จ. จรัสศรี", en: "Assoc. Prof. E. Jarassri" },
    role: { th: "มหาวิทยาลัย จ", en: "University E" },
    area: { th: "การประมวลผลสัญญาณ", en: "Signal Processing" },
    image: "/images/people/person-e.jpg",
  },
  {
    name: { th: "ผศ.ดร. ฉ. ฉัตรชัย", en: "Asst. Prof. F. Chatchai" },
    role: { th: "มหาวิทยาลัย ฉ", en: "University F" },
    area: { th: "IoT และระบบฝังตัว", en: "IoT & Embedded Systems" },
    image: "/images/people/person-f.jpg",
  },
];

export function MemberSpotlightSection({ locale, dict }: MemberSpotlightSectionProps) {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {dict.home.sectionSpotlight}
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            {dict.home.spotlightSubtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.image} className="border-border bg-card">
              <CardContent className="flex items-start gap-4 p-6">
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarImage
                    src={member.image}
                    alt={member.name[locale]}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {member.name[locale].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="truncate text-sm font-semibold text-card-foreground">
                    {member.name[locale]}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {member.role[locale]}
                  </p>
                  <span className="mt-1 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {member.area[locale]}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
