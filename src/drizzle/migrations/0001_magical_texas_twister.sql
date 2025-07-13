ALTER TABLE "job_listing_)applications" RENAME TO "job_listing_applications";--> statement-breakpoint
ALTER TABLE "job_listing_applications" DROP CONSTRAINT "job_listing_)applications_jobListingId_job_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "job_listing_applications" DROP CONSTRAINT "job_listing_)applications_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "job_listing_applications" DROP CONSTRAINT "job_listing_)applications_jobListingId_userId_pk";--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_jobListingId_userId_pk" PRIMARY KEY("jobListingId","userId");--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_jobListingId_job_listings_id_fk" FOREIGN KEY ("jobListingId") REFERENCES "public"."job_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;