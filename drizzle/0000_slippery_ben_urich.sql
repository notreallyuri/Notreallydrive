CREATE TABLE "drive_tutorial_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drive_tutorial_files_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" text NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"url" text NOT NULL,
	"file_key" text NOT NULL,
	"parent_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drive_tutorial_folders_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" text NOT NULL,
	"name" text NOT NULL,
	"parent_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drive_tutorial_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "drive_tutorial_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "drive_tutorial_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "drive_tutorial_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "drive_tutorial_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "drive_tutorial_account" ADD CONSTRAINT "drive_tutorial_account_user_id_drive_tutorial_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."drive_tutorial_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drive_tutorial_session" ADD CONSTRAINT "drive_tutorial_session_user_id_drive_tutorial_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."drive_tutorial_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "files_parent_index" ON "drive_tutorial_files_table" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "files_owner_id_index" ON "drive_tutorial_files_table" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "folders_parent_index" ON "drive_tutorial_folders_table" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "folders_owner_id_index" ON "drive_tutorial_folders_table" USING btree ("owner_id");