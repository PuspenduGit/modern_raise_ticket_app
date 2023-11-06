describe("User Login", () => {
  beforeEach(() => {
    cy.visit("https://modern-raise-ticket-app.vercel.app/login");
  });

  function login(email, password) {

    const email_button = "#email";
    const password_button = "#password";
    const login_button = ".bg-blue-500";

    it("login", () => {
      cy.get(email_button).type(email);
      cy.get(password_button).type(password);
      cy.get(login_button).click();
    });
  }

  const email = "a@gmail.com";
  const password = "a@gmail.com";

  login(email, password);
});

// describe("Create a Ticket", () => {
//   const title = "title";
//   const description = "description";
//   const category = "backend";
//   const importance = "critical";
//   const progress = "25";
//   const status = "open";

//   it("passes", () => {
//     // cy.visit("https://modern-raise-ticket-app.vercel.app/");
//     cy.get(".fa-ticket > path").click();
//     cy.get("#title").click();
//     cy.get("#title").type(title);
//     cy.get("#description").type(description);
//     cy.get("#category").select(category);
//     cy.get("#importance").select(importance);
//     cy.get("#progress").type(progress);
//     cy.get("#status").select(status);
//     cy.get(".btn").click();
//   });
// });
