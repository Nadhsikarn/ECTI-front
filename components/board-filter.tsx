"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BoardMember {
  id: number;
  name: string;
  role: string;
  institution: string;
  term: string | null;
  image: string;
}

interface BoardFilterProps {
  members: BoardMember[];
  labels: {
    term: string;
  };
}

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <Card className="border-border transition-shadow hover:shadow-md">
      <CardContent className="flex items-start gap-4 p-5">
        <Avatar className="h-14 w-14 shrink-0">
          <AvatarImage
            src={member.image}
            alt={member.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
            {member.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate font-semibold text-foreground">{member.name}</p>
          <p className="text-sm text-muted-foreground">{member.role}</p>
          <p className="truncate text-xs text-muted-foreground">{member.institution}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function BoardFilter({ members, labels }: BoardFilterProps) {
  const terms = Array.from(
    new Set(
      members
        .map((m) => m.term)
        .filter((t): t is string => t !== null && t !== "")
    )
  )
    .sort()
    .reverse();

  const [term, setTerm] = useState<string>(terms[0] ?? "");

  // Members without a term (added before the field existed) stay visible in every term
  const filtered =
    terms.length === 0
      ? members
      : members.filter((m) => !m.term || m.term === term);

  const president = filtered.find(
    (m) =>
      m.role === "นายกสมาคม" ||
      m.role === "President" ||
      m.role === "ECTI President"
  );
  const others = filtered.filter((m) => m !== president);

  return (
    <div className="flex flex-col gap-6">
      {/* เลือกวาระ — label อยู่ใน trigger ตาม convention หน้า events */}
      {terms.length > 0 && (
        <div className="flex justify-start">
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger
              aria-label={labels.term}
              className="h-11 rounded-full border-primary/30 bg-primary/5 px-5 shadow-sm transition-colors hover:bg-primary/10"
            >
              <CalendarDays className="size-4 text-primary" />
              <SelectValue>
                <span className="text-muted-foreground">{labels.term}:</span>
                <span className="font-semibold text-foreground">{term}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {terms.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* นายกแถวแรกกลาง */}
      {president && (
        <div className="flex justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <MemberCard member={president} />
          </div>
        </div>
      )}

      {/* คนอื่นๆ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
