import {
  integer,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { JobListingTable } from "./jobListing";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const applicationStages = [
  "Rejected",
  "In Review",
  "Interested",
  "Interviewed",
  "Hired",
] as const;
export type ApplicationStage = (typeof applicationStages)[number];
export const applicationStageEnum = pgEnum(
  "job_listing_applications_stage",
  applicationStages
);

export const JobListingApplicationTable = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid()
      .references(() => JobListingTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    userId: varchar()
      .references(() => UserTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    coverLetter: varchar(),
    rating: integer(),
    stage: applicationStageEnum().notNull().default("In Review"),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.jobListingId, table.userId] })]
);

export const jobListingApplicationRelations = relations(
  JobListingApplicationTable,
  ({ one }) => ({
    jobListing: one(JobListingTable, {
      fields: [JobListingApplicationTable.jobListingId],
      references: [JobListingTable.id],
    }),
    user: one(UserTable, {
      fields: [JobListingApplicationTable.userId],
      references: [UserTable.id],
    }),
  })
);
