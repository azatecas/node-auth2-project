
exports.seed = function(knex) {

  return knex('users').insert([
    {
      username:"luis",
      password: "super",
      department:"lambda"
    },
    {
      username:"luis2",
      password: "super2",
      department: "lambda2"
    },
  ])
};
