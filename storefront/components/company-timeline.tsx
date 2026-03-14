import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@/components/ui/timeline";
import { History, Speech, Users } from "lucide-react";
import { Feature } from "./feature";

const items = [
  {
    date: "Mar 15, 2024",
    description:
      "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    id: 1,
    title: "Project Kickoff",
    icon: History,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
  },
  {
    date: "Mar 22, 2024",
    description:
      "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    id: 2,
    title: "Design Phase",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30",
  },
  {
    icon: Speech,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    date: "Apr 5, 2024",
    description:
      "Backend API implementation and frontend component development in progress.",
    id: 3,
    title: "Development Sprint",
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
