CREATE TABLE "person" (
	"user_id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL UNIQUE,
	CONSTRAINT person_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cars" (
	"car_id" serial NOT NULL UNIQUE,
	"car_model" varchar,
	"car_make" varchar,
	"car_year" varchar,
	"car_miles" varchar,
	CONSTRAINT cars_pk PRIMARY KEY ("car_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "drivers" (
	"id" serial NOT NULL UNIQUE,
	"driver_id" integer NOT NULL,
	"car_id" integer NOT NULL UNIQUE,
	CONSTRAINT drivers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transactions" (
	"transaction_id" serial NOT NULL UNIQUE,
	"driver_id" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"city" varchar,
	"state" varchar,
	"car_milage" varchar,
	"price_gallon" varchar,
	"gallons_purchased" varchar,
	CONSTRAINT transactions_pk PRIMARY KEY ("transaction_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "maintenance" (
	"maintenance_id" serial NOT NULL,
	"driver_id" integer NOT NULL,
	"notes" varchar,
	CONSTRAINT maintenance_pk PRIMARY KEY ("maintenance_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "drivers" ADD CONSTRAINT "drivers_fk0" FOREIGN KEY ("driver_id") REFERENCES "person"("user_id");
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_fk1" FOREIGN KEY ("car_id") REFERENCES "cars"("car_id");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id");

ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_fk0" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id");
