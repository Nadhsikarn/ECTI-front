"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Committee = "all" | "exec" | "academic" | "publications";

interface BoardMember {
  name: string;
  role: string;
  institution: string;
  committee: Exclude<Committee, "all">;
  image: string;
}

interface BoardFilterProps {
  members: BoardMember[];
  labels: {
    all: string;
    exec: string;
    academic: string;
    publications: string;
  };
}

function MemberCard({
  member,
  committeeColors,
  committeeLabels,
}: {
  member: BoardMember;
  committeeColors: Record<string, string>;
  committeeLabels: Record<string, string>;
}) {
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
          <Badge
            variant="secondary"
            className={`mt-1 w-fit text-xs ${committeeColors[member.committee] ?? ""}`}
          >
            {committeeLabels[member.committee]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function BoardFilter({ members, labels }: BoardFilterProps) {
  const [filter, setFilter] = useState<Committee>("all");

  const filtered =
    filter === "all" ? members : members.filter((m) => m.committee === filter);

  const president = filtered.find(
    (m) => m.role === "นายกสมาคม" || m.role === "President" || m.role === "ECTI President"
  );
  const others = filtered.filter(
    (m) => m.role !== "นายกสมาคม" && m.role !== "President" && m.role !== "ECTI President"
  );

  const filters: { key: Committee; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "exec", label: labels.exec },
    { key: "academic", label: labels.academic },
    { key: "publications", label: labels.publications },
  ];

  const committeeColors: Record<string, string> = {
    exec: "bg-primary/10 text-primary",
    academic: "bg-accent/10 text-accent",
    publications: "bg-chart-4/15 text-chart-4",
  };

  const committeeLabels: Record<string, string> = {
    exec: labels.exec,
    academic: labels.academic,
    publications: labels.publications,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.key)}
            className={
              filter === f.key
                ? "bg-primary text-primary-foreground"
                : "border-border text-foreground"
            }
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* นายกแถวแรกกลาง */}
      {president && (
        <div className="flex justify-center">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <MemberCard
              member={president}
              committeeColors={committeeColors}
              committeeLabels={committeeLabels}
            />
          </div>
        </div>
      )}

      {/* คนอื่นๆ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((member) => (
          <MemberCard
            key={member.name}
            member={member}
            committeeColors={committeeColors}
            committeeLabels={committeeLabels}
          />
        ))}
      </div>
    </div>
  );
}