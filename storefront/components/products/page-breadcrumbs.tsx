import type { BreadcrumbSegment } from "@/lib/categories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";

interface PageBreadcrumbsProps {
  segments: BreadcrumbSegment[];
  currentPage: string;
}

const PageBreadcrumbs = ({ segments, currentPage }: PageBreadcrumbsProps) => {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Početna</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/proizvodi/kategorije">Kategorije</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment) => (
          <Fragment key={segment.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={segment.href}>{segment.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumbs;
