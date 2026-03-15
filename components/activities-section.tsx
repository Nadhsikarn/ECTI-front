import { Presentation, BookOpen, Network, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n";

interface ActivitiesSectionProps {
  dict: Dictionary;
}

export function ActivitiesSection({ dict }: ActivitiesSectionProps) {
  const activities = [
    {
      icon: Presentation,
      title: dict.home.activityConference,
      description: dict.home.activityConferenceDesc,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: BookOpen,
      title: dict.home.activityJournal,
      description: dict.home.activityJournalDesc,
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Network,
      title: dict.home.activityNetwork,
      description: dict.home.activityNetworkDesc,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Award,
      title: dict.home.activityAward,
      description: dict.home.activityAwardDesc,
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {dict.home.sectionWhatWeDo}
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            {dict.home.whatWeDoSubtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <Card
              key={activity.title}
              className="border-border bg-card transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${activity.color}`}>
                  <activity.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {activity.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
