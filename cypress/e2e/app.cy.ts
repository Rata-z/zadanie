describe("Features", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should perform a series of tasks", () => {
    const fillForm = (labelText: string, inputValue: string, submit = true) => {
      cy.get("label")
        .contains(labelText)
        .find('input[data-testid="input"]')
        .type(inputValue);
      submit && cy.get('[data-testid="submit-button"]').click();
    };

    const assertVisibility = (id: string) => {
      cy.get(`[data-testid="${id}"]`).should("be.visible");
    };

    // Click first add menu button
    cy.get('[data-testid="menu-button"]').should("not.be.disabled").click();

    // Verify 'add-menu' button and submit button visibility
    assertVisibility("add-menu");
    assertVisibility("submit-button");

    // Submit invalid data and check for hint text
    cy.get('[data-testid="submit-button"]').should("not.be.disabled").click();
    cy.get('[data-testid="hint-text"]')
      .should("be.visible")
      .and("have.text", "To pole jest wymagane.");

    // Add "Test Menu" to label
    fillForm("Nazwa", "Test Menu");
    cy.get('[data-testid="list-item"]')
      .contains("Test Menu")
      .should("be.visible");

    // Edit the added "Test Menu" item
    cy.get('[data-testid="list-item"]').contains("button", "Edytuj").click();
    assertVisibility("add-menu");

    // Add URL to "Test Menu" and check link type
    fillForm("Link", "https://www.123.com");
    cy.get('[data-testid="list-item"]').contains("URL").should("be.visible");

    // Add "Test Menu2" and check link type
    cy.get('[data-testid="menu-button"]').click();
    fillForm("Nazwa", "Test Menu2", false);
    fillForm("Link", "https://123");
    cy.get('[data-testid="list-item"]')
      .contains("kolekcja")
      .should("be.visible");

    // Set both items
    const firstItem = cy.get('[data-testid="list-item"]').contains("URL");
    const secondItem = cy
      .get('[data-testid="list-item"]')
      .contains("Test Menu2");

    // Move second item to the position of first
    firstItem.then(($first) => {
      const firstItemPosition = $first[0].getBoundingClientRect();
      secondItem.then(($second) => {
        const secondItemPosition = $second[0].getBoundingClientRect();

        const deltaX = firstItemPosition.x - secondItemPosition.x;
        const deltaY = firstItemPosition.y - secondItemPosition.y;

        secondItem.move({ deltaX, deltaY });
      });
    });

    // Assert that "Test Menu2" is now higher
    firstItem.then(($first) => {
      secondItem.then(($second) => {
        const firstItemPosition = $first[0].getBoundingClientRect();
        const secondItemPosition = $second[0].getBoundingClientRect();

        expect(secondItemPosition.top).to.be.lessThan(firstItemPosition.top);
      });
    });

    // Add child to "Test Menu"
    cy.get('[data-testid="list-item"]')
      .contains("Test Menu")
      .parents()
      .find("button")
      .contains("Dodaj pozycję menu")
      .click();

    // Type "Test Child" in the input field and submit
    fillForm("Nazwa", "Test Child");

    // Assert that "Test Child" is visible
    cy.get('[data-testid="list-item"]')
      .contains("Test Child")
      .should("be.visible");

    // Delete the item that contains child
    cy.get('[data-testid="list-item"]')
      .contains("Test Menu")
      .parents()
      .find("button")
      .contains("Usuń")
      .click();

    // Assert that "Test Child" and "Test Menu" are no longer visible
    cy.get('[data-testid="list-item"]')
      .contains("Test Child")
      .should("not.exist");
    firstItem.should("not.exist");
  });
});
