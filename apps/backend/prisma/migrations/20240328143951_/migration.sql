-- CreateEnum
CREATE TYPE "parameter_code" AS ENUM ('ACCESS_TOKEN_LIFE_TIME', 'REFRESH_TOKEN_LIFE_TIME', 'SPEECH_CREDENTIALS', 'DADATA_CREDENTIALS', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_BOT_NAME', 'DEVICE_DETECT_INTERVAL');

-- CreateEnum
CREATE TYPE "device_status" AS ENUM ('NEW', 'WAITED', 'WORK', 'STOPPED');

-- CreateEnum
CREATE TYPE "speech_status" AS ENUM ('NEW', 'DONE', 'ERROR');

-- CreateEnum
CREATE TYPE "speech_compression" AS ENUM ('pcmu', 'pcma');

-- CreateTable
CREATE TABLE "organizations" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "code" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "organization_id" BIGINT,
    "email" TEXT,
    "additional_data" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" BIGSERIAL NOT NULL,
    "token" TEXT,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "name" VARCHAR(80) NOT NULL,
    "unpacked" BOOLEAN NOT NULL DEFAULT false,
    "size" INTEGER,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "parameters" (
    "name" TEXT NOT NULL,
    "code" "parameter_code" NOT NULL,
    "description" TEXT,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "parameters_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "parameters_changes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "parameter_code" "parameter_code" NOT NULL,
    "was" TEXT NOT NULL,
    "became" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "parameters_changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" BIGSERIAL NOT NULL,
    "code" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "ip" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "device_type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "geo" TEXT NOT NULL,
    "software_type" TEXT NOT NULL,
    "software_version" TEXT NOT NULL,
    "organization_id" BIGINT,
    "status" "device_status" NOT NULL DEFAULT 'NEW',
    "ssh_parameters" TEXT,
    "is_alive" BOOLEAN,
    "last_action_date" TIMESTAMPTZ(1),
    "additional_data" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_info" (
    "id" BIGSERIAL NOT NULL,
    "device_code" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "request_time" TIMESTAMPTZ(1) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "logs_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_error" (
    "id" BIGSERIAL NOT NULL,
    "device_code" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "request_time" TIMESTAMPTZ(1) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "logs_error_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_achievs" (
    "id" BIGSERIAL NOT NULL,
    "goal_id" BIGINT NOT NULL,
    "device_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "goal_achievs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failures" (
    "id" BIGSERIAL NOT NULL,
    "device_id" BIGINT NOT NULL,
    "repared_date" TIMESTAMP(3),
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "is_deleted" TIMESTAMPTZ(3),

    CONSTRAINT "failures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failures_notifications" (
    "failure_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "failures_notifications_pkey" PRIMARY KEY ("failure_id","user_id")
);

-- CreateTable
CREATE TABLE "cameras" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "organization_id" BIGINT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cameras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speeches" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "comment" TEXT,
    "status" "speech_status" NOT NULL DEFAULT 'NEW',
    "compression" "speech_compression" NOT NULL,
    "sample_rate" INTEGER NOT NULL,
    "file_name" TEXT NOT NULL,
    "recognized_text" TEXT,
    "recognized_date" TIMESTAMP(3),
    "api_result" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "speeches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "user_id" BIGINT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "failure" BOOLEAN NOT NULL DEFAULT false,
    "error_log" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "devices_code_key" ON "devices"("code");

-- CreateIndex
CREATE UNIQUE INDEX "goals_code_key" ON "goals"("code");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_chat_id_key" ON "notifications"("chat_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parameters_changes" ADD CONSTRAINT "parameters_changes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parameters_changes" ADD CONSTRAINT "parameters_changes_parameter_code_fkey" FOREIGN KEY ("parameter_code") REFERENCES "parameters"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_info" ADD CONSTRAINT "logs_info_device_code_fkey" FOREIGN KEY ("device_code") REFERENCES "devices"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_error" ADD CONSTRAINT "logs_error_device_code_fkey" FOREIGN KEY ("device_code") REFERENCES "devices"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_achievs" ADD CONSTRAINT "goal_achievs_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_achievs" ADD CONSTRAINT "goal_achievs_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "failures" ADD CONSTRAINT "failures_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "failures_notifications" ADD CONSTRAINT "failures_notifications_failure_id_fkey" FOREIGN KEY ("failure_id") REFERENCES "failures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "failures_notifications" ADD CONSTRAINT "failures_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cameras" ADD CONSTRAINT "cameras_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
