const encrypt = require("../modules/encrypt.js");

module.exports = function (server, db) {
  server.get("/data/users", (request, res) => {
    let query = "SELECT id, email FROM users";
    let result = db.prepare(query).all();
    res.json(result);
  });

  server.get("/data/users/:id", (request, res) => {
    let query = "SELECT id, email FROM users WHERE id = @id";
    let result = db.prepare(query).all(request.params);
    res.json(result[0]);
  });

  // registrera en ny användare
  server.post("/data/users", (request, response) => {
    let user = request.body;
    let encryptedPassword = encrypt(user.password);
    let result;
    try {
      result = db
        .prepare(
          "INSERT INTO users (email, password, roles, firstname,lastname) VALUES(?,?,?,?,?)"
        )
        .run([
          user.email,
          encryptedPassword,
          user.role,
          user.firstName,
          user.lastName,
        ]);
    } catch (e) {
      console.error(e);
    }
    response.json(result);
  });

  // begär ändring av lösenord för användare
  server.delete("/data/users/password", (request, response) => {
    let user = request.body;
    let result;
    try {
      result = db
        .prepare("UPDATE users SET password = NULL WHERE email = ?")
        .run([user.email]);
    } catch (e) {
      console.error(e);
    }
    response.json(result);
  });

  // ändra lösenord för användare
  server.put("/data/users/password", (request, response) => {
    let user = request.body;
    let encryptedPassword = encrypt(user.password);
    let result;
    try {
      result = db
        .prepare(
          "UPDATE users SET password = ? WHERE password IS NULL AND email = ?"
        )
        .run([encryptedPassword, user.email]);
    } catch (e) {
      console.error(e);
    }
    response.json(result);
  });
};
