import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@/components/ui/timeline";
import { Rocket, Speech, Wrench } from "lucide-react";
import { Feature } from "./feature";

const timeline = [
  {
    year: "Pre 30+ godina",
    title: "Početak u svetu alata",
    description:
      "Naša porodična priča počinje pre više od tri decenije ulaskom u industriju alata. Kroz svakodnevni rad sa profesionalcima i hobistima sticali smo iskustvo i razumevanje tržišta.",
  },
  {
    year: "Godine rada sa kupcima",
    title: "Slušanje potreba korisnika",
    description:
      "Radom sa majstorima, instalaterima i serviserima svakodnevno smo slušali njihove sugestije. Njihova iskustva i komentari postali su ključne smernice za razvoj budućih proizvoda.",
  },
  {
    year: "Pre 7 godina",
    title: "Nastanak brenda SG Tools",
    description:
      "Znanje i iskustvo koje smo godinama gradili pretvorili smo u sopstveni brend. Tako je nastao SG Tools — alat razvijen sa jasnim ciljem da ponudi profesionalni kvalitet po pristupačnoj ceni.",
  },
  {
    year: "Danas",
    title: "Širenje asortimana",
    description:
      "Danas nastavljamo da razvijamo nove proizvode i širimo asortiman, ostajući verni istoj filozofiji — kvalitet, pouzdanost i praktična rešenja za svakodnevni rad.",
  },
];

const items = [
  {
    date: "2019 - Present",
    description:
      "Naša porodična priča počinje pre više od tri decenije ulaskom u industriju alata. Kroz svakodnevni rad sa profesionalcima i hobistima sticali smo iskustvo i razumevanje tržišta.",
    id: 1,
    title: "Početak u svetu alata",
    icon: Wrench,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
  },
  {
    date: "2012 - 2019",
    description:
      "Radom sa majstorima, instalaterima i serviserima svakodnevno smo slušali njihove sugestije. Njihova iskustva i komentari postali su ključne smernice za razvoj budućih proizvoda.",
    id: 2,
    title: "Slušanje potreba korisnika",
    icon: Speech,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30",
  },
  {
    icon: Rocket,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    date: "1994 - 2012",
    description:
      "Znanje i iskustvo koje smo godinama gradili pretvorili smo u sopstveni brend. Tako je nastao SG Tools — alat razvijen sa jasnim ciljem da ponudi profesionalni kvalitet po pristupačnoj ceni.",
    id: 3,
    title: "Nastanak brenda SG Tools",
  },
];

export default function CompanyTimeline() {
  return (
    <Timeline defaultValue={4}>
      {items.map((item) => (
        <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>{item.date}</TimelineDate>

            <TimelineIndicator />
          </TimelineHeader>
          <TimelineContent className="h-full">
            <Feature
              className="px-0!"
              bg={item.bg}
              border={item.border}
              color={item.color}
              desc={item.description}
              icon={item.icon}
              title={item.title}
            />
          </TimelineContent>
        </TimelineItem>
      ))}

      {/* These two items extends line further downward */}
      <TimelineItem key={4} step={4}>
        <TimelineHeader>
          <TimelineSeparator />
        </TimelineHeader>
      </TimelineItem>
      <TimelineItem key={5} step={5}>
        <TimelineHeader>
          <TimelineSeparator />
        </TimelineHeader>
      </TimelineItem>
    </Timeline>
  );
}
