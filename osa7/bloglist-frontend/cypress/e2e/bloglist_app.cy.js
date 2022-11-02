describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'cypress',
      username: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  it('login form works', function() {
    cy.get('#username-input').type('cypress')
    cy.get('#password-input').type('cypress')
    cy.get('#login-button').click()
    cy.contains('cypress logged in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username-input').type('cypress')
    cy.get('#password-input').type('wrongpassword')
    cy.get('#login-button').click()
    cy.get('.message')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(33, 37, 41)')
    cy.get('html').should('not.contain', 'cypress logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress', password: 'cypress' })
    })

    it('a new blog can be created', function() {
      cy.contains('add new').click()
      cy.get('#title-input').type('a blog created')
      cy.get('#author-input').type('Cypress')
      cy.get('#url-input').type('www.cypress.io')
      cy.get('#create-button').click()
      cy.get('.list-group')
        .contains('a blog created by Cypress').click()
      cy.contains('a blog created by Cypress')
      cy.contains('added by cypress')
      cy.contains('www.cypress.io')
    })

    describe('and one blog is added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'a blog created', author: 'Cypress', url: 'www.cypress.io' })
      })

      it('a blog can be liked', function() {
        cy.get('.list-group')
          .contains('a blog created by Cypress').click()
        cy.contains('Likes').click()
        cy.get('.badge.bg-secondary')
          .contains('1')
      })

      it('a blog can be deleted', function() {
        cy.get('.list-group')
          .contains('a blog created by Cypress').click()
        cy.get('#remove-button').click()
        cy.on('window:confirm', () => true)
        cy.get('html')
          .should('not.contain', 'a blog created by Cypress')
          .and('contain', 'blog removed')
      })
    })

    describe('and several blogs are added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'a blog created', author: 'Cypress', url: 'www.cypress.io' })
        cy.createBlog({ title: 'another blog created', author: 'Cypress', url: 'www.cypress.io', likes: 4 })
        cy.createBlog({ title: 'one more blog created', author: 'Cypress', url: 'www.cypress.io', likes: 3 })
      })

      it('blogs should be sorted correctly', function() {
        cy.get('.list-group-item.list-group-item-action').eq(0)
          .should('contain', 'another blog created by Cypress')
        cy.get('.list-group-item.list-group-item-action').eq(1)
          .should('contain', 'one more blog created by Cypress')
        cy.get('.list-group-item.list-group-item-action').eq(2)
          .should('contain', 'a blog created by Cypress')
      })
    })
  })
})
