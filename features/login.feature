Feature: Login Functionality
  As a user
  I want to be able to log in to the application
  To access my personal data

  Background:
    Given the user is on the login page

  @smoke @login
  Scenario: Successful login with valid credentials
    When the user enters valid credentials
    And clicks the login button
    Then they should be redirected to the dashboard
    And they should see a welcome message

  @login @negative
  Scenario: Failed login with invalid credentials
    When the user enters invalid credentials
    And clicks the login button
    Then they should see an error message
    And they should remain on the login page

  @login @validation
  Scenario: Required field validation
    When the user leaves the fields empty
    And clicks the login button
    Then they should see validation messages
    And the required fields should be marked as invalid

  @login @ui
  Scenario: Verify login interface elements
    Then they should see the email field
    And they should see the password field
    And they should see the login button
    And they should see the "Forgot Password" link
    And they should see the "Register" link

  @login @navigation
  Scenario: Navigation from login page
    When the user clicks "Forgot Password"
    Then they should be redirected to the password recovery page

    When the user clicks "Register"
    Then they should be redirected to the registration page 