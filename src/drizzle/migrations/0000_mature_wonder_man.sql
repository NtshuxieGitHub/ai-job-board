CREATE TYPE "public"."job_listings_experience_level" AS ENUM('Graduate', 'Junior', 'Intermediate', 'Senior', 'Lead');--> statement-breakpoint
CREATE TYPE "public"."job_listings_status" AS ENUM('Draft', 'Open', 'Closed');--> statement-breakpoint
CREATE TYPE "public"."job_listings_type" AS ENUM('Internship', 'Part-time', 'Full-time');--> statement-breakpoint
CREATE TYPE "public"."job_listings_location_requirement" AS ENUM('Remote', 'Hybrid', 'In-Office');--> statement-breakpoint
CREATE TYPE "public"."job_listings_wage_interval" AS ENUM('Hourly', 'Monthly', 'Yearly');--> statement-breakpoint
CREATE TYPE "public"."job_listing_applications_stage" AS ENUM('Rejected', 'In Review', 'Interested', 'Interviewed', 'Hired');--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"imageURL" varchar NOT NULL,
	"email" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "job_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"wage" integer,
	"wage_interval" "job_listings_wage_interval",
	"state_abbreviation" varchar,
	"city" varchar,
	"is_featured" boolean DEFAULT false NOT NULL,
	"location_requirement" "job_listings_location_requirement",
	"experience_level" "job_listings_experience_level" NOT NULL,
	"status" "job_listings_status" DEFAULT 'Draft' NOT NULL,
	"type" "job_listings_type" NOT NULL,
	"posted_at" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_listing_)applications" (
	"jobListingId" uuid NOT NULL,
	"userId" varchar NOT NULL,
	"covreLetter" varchar,
	"rating" integer,
	"stage" "job_listing_applications_stage" DEFAULT 'In Review' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_listing_)applications_jobListingId_userId_pk" PRIMARY KEY("jobListingId","userId")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"imageURL" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_user_settings" (
	"userId" varchar NOT NULL,
	"organizationId" varchar NOT NULL,
	"newApplicationEmailNotifications" boolean DEFAULT false NOT NULL,
	"minimumRating" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organization_user_settings_userId_organizationId_pk" PRIMARY KEY("userId","organizationId")
);
--> statement-breakpoint
CREATE TABLE "user_notification_settings" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"newJobEmailNotifcations" boolean DEFAULT false NOT NULL,
	"aiPrompt" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_resumes" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"resumeFileUrl" varchar NOT NULL,
	"resumeFileKey" varchar NOT NULL,
	"aiSummary" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_)applications" ADD CONSTRAINT "job_listing_)applications_jobListingId_job_listings_id_fk" FOREIGN KEY ("jobListingId") REFERENCES "public"."job_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_)applications" ADD CONSTRAINT "job_listing_)applications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_settings" ADD CONSTRAINT "organization_user_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_settings" ADD CONSTRAINT "organization_user_settings_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notification_settings" ADD CONSTRAINT "user_notification_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD CONSTRAINT "user_resumes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "job_listings_state_abbreviation_index" ON "job_listings" USING btree ("state_abbreviation");