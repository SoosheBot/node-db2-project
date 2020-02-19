# Project setup from start to finish

1. Build out your root file structure with `gitignore, .env (optional), index.js, server.js` to start.

2. Run `npm init` and install `package.json` using the prompts. -- don't forget to change the `scripts` line from test into something more useful. An example:
             `"scripts": {`
                    `"server": "nodemon index.js"`

3. Run `npm i`, and then run `npm i` to get your dependencies. Some good ones are: `sqlite3, express, knex, knex-cleaner, nodemon, cors, dotenv, helmet`.

4. Run `npx knex init` to create your `knexfile.js` file. Update it to reflect a proper migrations and seeds path, as well as a preferred name for your table.
    An example: 
            module.exports = {
            development: {
                client: 'sqlite3',
                useNullAsDefault: true,
                connection: {
                filename: './data/WHATEVERYOUWANTTONAMEYOURTABLE.DB3’
                },
                migrations: {
                directory: './data/migrations'
                },
                seeds: {
                directory: './data/seeds'
                },
                pool: {
                afterCreate: (conn, done) => {
                    // runs after a connection is made to the sqlite engine
                    conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
                },
                },
            },
            };

5. Continue to build out your root folder, add a `data folder` in the root with `> migrations > seeds` folders inside.If you haven't consider, and map the design of your tables for your migrations. dbDesigner is a decent system.

## Adding Content

1. If you haven't, modify your gitignore file to show all the things you want ignored. Use a previous project's data, if you need.

2. Set your `dotenv` file's port, and then head to `index.js` to import and set your listening server business.

3. Import dependencies into your `server` file and map out your routes. Add all the content to make a working server and don't forget the `module.exports` in the end to export it to the index file correctly.

4. Time to work on your migrations! Run `knex migrate:make [name of your migration file]` to build your data folder with your migrations. You can do `knex seed:make 00-[seed name]` to make seeds.
    4a. Build your tables in migrations, and from them you can also build seeds.

5. Add a `dbConfig.js` file in your data folder and add content to export all your knex-es. Then you can run your migrations with `knex migrate:latest` and `knex seed:run`. Note--Any time you run a migrate:latest, you need to rerun your seeds. You can also run it to reset your Insomnia file, if you like.

6. Build your helper files, and then your route files with CRUD operations. Use Insomnia to test endpoints.





