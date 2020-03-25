
exports.seed = function(knex) {

  return knex('users').insert([
    {
      username:"luis",
      password: "super"
    },
    {
      username:"luis2",
      password: "super2"
    },
  ])
};
