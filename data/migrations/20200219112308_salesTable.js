exports.up = function(knex, Promise) {
    return knex.schema.createTable("sales", tbl => {
      tbl.increments("sales_id");
      tbl.boolean("sold").defaultTo(false);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("sales");
  };
  