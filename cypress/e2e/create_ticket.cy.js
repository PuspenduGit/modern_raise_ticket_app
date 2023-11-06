describe("Create a Ticket", () => {
  beforeEach(() => {
    cy.visit("https://modern-raise-ticket-app.vercel.app/login");
  });

  function login(email, password) {
    const email_button = "#email";
    const password_button = "#password";
    const login_button = ".bg-blue-500";

    cy.get(email_button).type(email);
    cy.get(password_button).type(password);
    cy.get(login_button).click();
    cy.wait(5000);
  }

  function create_ticket(
    title,
    description,
    category,
    importance,
    progress,
    status
  ) {
    const ticket_button = ".fa-ticket > path";
    const title_button = "#title";
    const description_button = "#description";
    const category_button = "#category";
    const importance_button = "#importance";
    const progress_button = "#progress";
    const status_button = "#status";
    const submit_button = ".btn";

    cy.get(ticket_button).click();
    cy.get(title_button).type(title);
    cy.get(description_button).type(description);
    cy.get(category_button).select(category);
    cy.get(importance_button).select(importance);
    cy.get(progress_button).type(progress);
    cy.get(status_button).select(status);
    cy.get(submit_button).click();
  }

  const email = "a@gmail.com";
  const password = "a@gmail.com";

  const title = "cy2.0";
  const description = "cy2";
  const category = "backend";
  const importance = "critical";
  const progress = "25";
  const status = "open";

  it("passes", () => {
    login(email, password);
    create_ticket(title, description, category, importance, progress, status);
  });
});
