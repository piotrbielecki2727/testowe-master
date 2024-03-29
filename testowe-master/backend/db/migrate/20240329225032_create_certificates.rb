class CreateCertificates < ActiveRecord::Migration[5.2]
  def change
    create_table :certificates do |t|
      t.string :name, null: false, default: ""
      t.text :description
      t.references :user, foreign_key: true

      t.timestamps null: false
    end
  end
end