class CreateInitialSchema < ActiveRecord::Migration[8.0]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.string :address
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :areas do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :name, null: false
      t.string :map_file
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :links do |t|
      t.string :name, null: false
      t.text :description
      t.string :value
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :areas_links do |t|
      t.references :area, null: false, foreign_key: true
      t.references :link, null: false, foreign_key: true

      t.timestamps
    end
    add_index :areas_links, %i[area_id link_id], unique: true

    create_table :users do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :area, foreign_key: true
      t.string :name, null: false
      t.string :phone_number
      t.string :username, null: false
      t.string :password_digest
      t.string :user_level, null: false
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :users, %i[organization_id username], unique: true

    create_table :customers do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :name, null: false
      t.string :address
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :colors do |t|
      t.references :customer, foreign_key: true
      t.references :job, foreign_key: true
      t.string :name, null: false
      t.string :color_code
      t.string :brand
      t.float :powder_in_stock
      t.float :powder_on_order
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :jobs do |t|
      t.references :customer, null: false, foreign_key: true
      t.references :area, null: false, foreign_key: true
      t.integer :ticket_no, null: false
      t.date :completed_on
      t.float :powder_used
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :jobs, :ticket_no

    create_table :task_types do |t|
      t.references :area, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :tasks do |t|
      t.references :job, null: false, foreign_key: true
      t.references :task_type, null: false, foreign_key: true
      t.datetime :started_at
      t.datetime :stopped_at
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :punches do |t|
      t.references :task, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.datetime :time, null: false
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
