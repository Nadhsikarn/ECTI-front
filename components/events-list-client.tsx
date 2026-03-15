"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Search,
  X,
  ArrowRight,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ECTIEvent, EventStatus, EventType } from "@/lib/events-data";
import type { Dictionary, Locale } from "@/lib/i18n";

interface EventsListClientProps {
  locale: Locale;
  dict: Dictionary;
  events: ECTIEvent[];
  years: number[];
  locations: string[];
}

const STATUS_ORDER: Record<EventStatus, number> = {
  cfp: 0,
  "reg-open": 1,
  upcoming: 2,
  past: 3,
};

function getStatusLabel(status: EventStatus, dict: Dictionary): string {
  const map: Record<EventStatus, string> = {
    upcoming: dict.events.statusUpcoming,
    cfp: dict.events.statusCfp,
    "reg-open": dict.events.statusRegOpen,
    past: dict.events.statusPast,
  };
  return map[status];
}

function getStatusStyle(status: EventStatus): string {
  switch (status) {
    case "cfp":
      return "bg-accent text-accent-foreground";
    case "reg-open":
      return "bg-primary text-primary-foreground";
    case "upcoming":
      return "bg-chart-4 text-primary-foreground";
    case "past":
      return "bg-muted text-muted-foreground";
  }
}

function getTypeLabel(type: EventType, dict: Dictionary): string {
  const map: Record<EventType, string> = {
    conference: dict.events.typeConference,
    workshop: dict.events.typeWorkshop,
    seminar: dict.events.typeSeminar,
  };
  return map[type];
}

export function EventsListClient({
  locale,
  dict,
  events,
  years,
  locations,
}: EventsListClientProps) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const isTh = locale === "th";

  const filtered = useMemo(() => {
    let result = [...events];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (isTh ? e.description_th : e.description_en).toLowerCase().includes(q) ||
          (isTh ? e.location_th : e.location_en).toLowerCase().includes(q)
      );
    }

    if (yearFilter !== "all") {
      result = result.filter((e) => e.year === Number(yearFilter));
    }
    if (typeFilter !== "all") {
      result = result.filter((e) => e.type === typeFilter);
    }
    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }
    if (locationFilter !== "all") {
      result = result.filter(
        (e) => (isTh ? e.location_th : e.location_en) === locationFilter
      );
    }

    result.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

    return result;
  }, [events, search, yearFilter, typeFilter, statusFilter, locationFilter, isTh]);

  const hasActiveFilters =
    search.trim() !== "" ||
    yearFilter !== "all" ||
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    locationFilter !== "all";

  function clearFilters() {
    setSearch("");
    setYearFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setLocationFilter("all");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 lg:p-6">
        {/* Search row */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={dict.events.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter selects */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Year */}
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder={dict.events.filterYear} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dict.events.filterAll}</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={dict.events.filterType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dict.events.filterAll}</SelectItem>
              <SelectItem value="conference">{dict.events.typeConference}</SelectItem>
              <SelectItem value="workshop">{dict.events.typeWorkshop}</SelectItem>
              <SelectItem value="seminar">{dict.events.typeSeminar}</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={dict.events.filterStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dict.events.filterAll}</SelectItem>
              <SelectItem value="cfp">{dict.events.statusCfp}</SelectItem>
              <SelectItem value="reg-open">{dict.events.statusRegOpen}</SelectItem>
              <SelectItem value="upcoming">{dict.events.statusUpcoming}</SelectItem>
              <SelectItem value="past">{dict.events.statusPast}</SelectItem>
            </SelectContent>
          </Select>

          {/* Location */}
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder={dict.events.filterLocation} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dict.events.filterAll}</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              {dict.events.clearFilters}
            </Button>
          )}
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {yearFilter !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1 pr-1.5"
                onClick={() => setYearFilter("all")}
              >
                {yearFilter}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {typeFilter !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1 pr-1.5"
                onClick={() => setTypeFilter("all")}
              >
                {getTypeLabel(typeFilter as EventType, dict)}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1 pr-1.5"
                onClick={() => setStatusFilter("all")}
              >
                {getStatusLabel(statusFilter as EventStatus, dict)}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {locationFilter !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1 pr-1.5"
                onClick={() => setLocationFilter("all")}
              >
                {locationFilter.length > 30
                  ? locationFilter.slice(0, 30) + "..."
                  : locationFilter}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "event" : isTh ? "กิจกรรม" : "events"}
      </p>

      {/* Event cards */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-5">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} locale={locale} dict={dict} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold text-foreground">
            {dict.events.noResults}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {dict.events.noResultsDesc}
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
            {dict.events.clearFilters}
          </Button>
        </div>
      )}
    </div>
  );
}

/* ---- Skeleton loader ---- */
export function EventsListSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 lg:p-6">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-9 w-[130px]" />
          <Skeleton className="h-9 w-[180px]" />
          <Skeleton className="h-9 w-[180px]" />
          <Skeleton className="h-9 w-[240px]" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-border p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Individual Event Card ---- */
function EventCard({
  event,
  locale,
  dict,
}: {
  event: ECTIEvent;
  locale: Locale;
  dict: Dictionary;
}) {
  const isTh = locale === "th";
  const date = isTh ? event.date_th : event.date_en;
  const location = isTh ? event.location_th : event.location_en;
  const description = isTh ? event.description_th : event.description_en;

  const deadlinesToShow = event.deadlines.slice(0, 3);

  return (
    <Card className="group border-border transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-col gap-4 p-5 md:p-6">
        {/* Top row: title + badges */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-lg font-semibold text-card-foreground">
                {event.title}
              </h3>
              <Badge className={getStatusStyle(event.status)}>
                {getStatusLabel(event.status, dict)}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                {getTypeLabel(event.type, dict)}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {location}
          </span>
        </div>

        {/* Deadlines row */}
        {deadlinesToShow.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
            {deadlinesToShow.map((d, i) => (
              <span key={i} className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span className="font-medium">{isTh ? d.label_th : d.label_en}:</span>{" "}
                {isTh ? d.date_th : d.date_en}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Link href={`/${locale}/events/${event.slug}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              {dict.events.btnDetails}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          {event.status === "cfp" && (
            <Button size="sm" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              <CalendarCheck className="h-3.5 w-3.5" />
              {dict.events.btnSubmitPaper}
            </Button>
          )}
          {(event.status === "reg-open" || event.status === "upcoming") && (
            <Button size="sm" className="gap-1.5">
              <CalendarCheck className="h-3.5 w-3.5" />
              {dict.events.btnRegister}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
