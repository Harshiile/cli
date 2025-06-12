CREATE TABLE "cli-users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "cli-users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "cli-workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"owner" varchar NOT NULL,
	"zip_id" varchar NOT NULL,
	"visibility_public" boolean,
	CONSTRAINT "cli-workspaces_name_owner_unique" UNIQUE("name","owner")
);
--> statement-breakpoint
ALTER TABLE "cli-workspaces" ADD CONSTRAINT "cli-workspaces_owner_cli-users_username_fk" FOREIGN KEY ("owner") REFERENCES "public"."cli-users"("username") ON DELETE no action ON UPDATE no action;