exports.up = function(knex) {
    return knex.schema
    // a uniqe ID.
    //  a name. This column is required.
    // a description.
    //  a boolean that indicates if the project has been completed. This column cannot be NULL, the default value should be false.

      .createTable('projects', tbl => {
          tbl.increments();
          tbl.string('project_name', 128).notNullable().unique();
          tbl.string('project_description', 128).notNullable();
          tbl.boolean('completed').notNullable().defaultTo(false);
      })
      .createTable('resources', tbl => {
          tbl.increments();
          tbl.string('resource_name', 128).notNullable().unique();
          tbl.string('resource_description', 128);
      })
      // we can chain together createTable
      // deleting a record also deletes all referencing records, we can set that up in our schema.
      .createTable('tasks', tbl => {
          tbl.increments();
          tbl.string('task_description').notNullable();
          tbl.string('task_notes');
          tbl.boolean('completed').notNullable().defaultTo(false);
          tbl.integer('project_id')
              .unsigned()
              .notNullable()
              .references('projects.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
      })
      .createTable('projects_resources', tbl => {
          tbl.integer('project_id')
              .unsigned()
              .notNullable()
              .references('projects.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          tbl.integer('resource_id')
              .unsigned()
              .notNullable()
              .references('resources.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          tbl.primary(['project_id', 'resource_id']);
      })
  };
  //remember reverse order
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('projects_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };
  