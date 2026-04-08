# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_04_08_000000) do
  create_table "areas", force: :cascade do |t|
    t.integer "organization_id", null: false
    t.string "name", null: false
    t.string "map_file"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_areas_on_organization_id"
  end

  create_table "areas_links", force: :cascade do |t|
    t.integer "area_id", null: false
    t.integer "link_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id", "link_id"], name: "index_areas_links_on_area_id_and_link_id", unique: true
    t.index ["area_id"], name: "index_areas_links_on_area_id"
    t.index ["link_id"], name: "index_areas_links_on_link_id"
  end

  create_table "colors", force: :cascade do |t|
    t.integer "customer_id"
    t.integer "job_id"
    t.string "name", null: false
    t.string "color_code"
    t.string "brand"
    t.float "powder_in_stock"
    t.float "powder_on_order"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_colors_on_customer_id"
    t.index ["job_id"], name: "index_colors_on_job_id"
  end

  create_table "customers", force: :cascade do |t|
    t.integer "organization_id", null: false
    t.string "name", null: false
    t.string "address"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_customers_on_organization_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.integer "customer_id", null: false
    t.integer "area_id", null: false
    t.integer "ticket_no", null: false
    t.date "completed_on"
    t.float "powder_used"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_jobs_on_area_id"
    t.index ["customer_id"], name: "index_jobs_on_customer_id"
    t.index ["ticket_no"], name: "index_jobs_on_ticket_no"
  end

  create_table "links", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "value"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.string "address"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "punches", force: :cascade do |t|
    t.integer "task_id", null: false
    t.integer "user_id", null: false
    t.datetime "time", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_punches_on_task_id"
    t.index ["user_id"], name: "index_punches_on_user_id"
  end

  create_table "task_types", force: :cascade do |t|
    t.integer "area_id", null: false
    t.string "name", null: false
    t.text "description"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_task_types_on_area_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "job_id", null: false
    t.integer "task_type_id", null: false
    t.datetime "started_at"
    t.datetime "stopped_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_id"], name: "index_tasks_on_job_id"
    t.index ["task_type_id"], name: "index_tasks_on_task_type_id"
  end

  create_table "users", force: :cascade do |t|
    t.integer "organization_id", null: false
    t.integer "area_id"
    t.string "name", null: false
    t.string "phone_number"
    t.string "username", null: false
    t.string "password_digest"
    t.string "user_level", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_users_on_area_id"
    t.index ["organization_id", "username"], name: "index_users_on_organization_id_and_username", unique: true
    t.index ["organization_id"], name: "index_users_on_organization_id"
  end

  add_foreign_key "areas", "organizations"
  add_foreign_key "areas_links", "areas"
  add_foreign_key "areas_links", "links"
  add_foreign_key "colors", "customers"
  add_foreign_key "colors", "jobs"
  add_foreign_key "customers", "organizations"
  add_foreign_key "jobs", "areas"
  add_foreign_key "jobs", "customers"
  add_foreign_key "punches", "tasks"
  add_foreign_key "punches", "users"
  add_foreign_key "task_types", "areas"
  add_foreign_key "tasks", "jobs"
  add_foreign_key "tasks", "task_types"
  add_foreign_key "users", "areas"
  add_foreign_key "users", "organizations"
end
