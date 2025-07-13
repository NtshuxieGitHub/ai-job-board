import {
  pgTable,
  varchar,
  text,
  pgEnum,
  integer,
  boolean,
  timestamp,
  index,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { OrganizationTable } from "./organization";
import { relations } from "drizzle-orm";
import { JobListingApplicationTable } from "./jobListingApplication";

export const wageIntervals = ["Hourly", "Monthly", "Yearly"] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum(
  "job_listings_wage_interval",
  wageIntervals
);

export const locationRequirements = ["Remote", "Hybrid", "In-Office"] as const;
export type LocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum(
  "job_listings_location_requirement",
  locationRequirements
);

export const experienceLevels = [
  "Graduate",
  "Junior",
  "Intermediate",
  "Senior",
  "Lead",
] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
  "job_listings_experience_level",
  experienceLevels
);

export const jobListingStatuses = ["Draft", "Open", "Closed"] as const;
export type JobListingStatus = (typeof jobListingStatuses)[number];
export const jobListingStatusEnum = pgEnum(
  "job_listings_status",
  jobListingStatuses
);

export const jobListingTypes = [
  "Internship",
  "Part-time",
  "Full-time",
] as const;
export type JobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes);

export const JobListingTable = pgTable(
  "job_listings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: varchar("organization_id")
      .references(() => OrganizationTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    title: varchar("title").notNull(),
    description: text("description").notNull(),
    wage: integer("wage"),
    wageInterval: wageIntervalEnum("wage_interval"),
    stateAbbreviation: varchar("state_abbreviation"),
    city: varchar("city"),
    isFeatured: boolean("is_featured").notNull().default(false),
    locationRequirement: locationRequirementEnum("location_requirement"),
    experienceLevel: experienceLevelEnum("experience_level").notNull(),
    status: jobListingStatusEnum("status").notNull().default("Draft"),
    type: jobListingTypeEnum("type").notNull(),
    postedAt: timestamp("posted_at", { withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index().on(table.stateAbbreviation)] // optional
);

export const jobListingReferences = relations(
  JobListingTable,
  ({ one, many }) => ({
    organization: one(OrganizationTable, {
      fields: [JobListingTable.organizationId],
      references: [OrganizationTable.id],
    }),
    applications: many(JobListingApplicationTable),
  })
);
