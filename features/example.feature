Feature: Basic Navigation
  As a user
  I want to navigate through the application
  To access different functionalities

  @smoke @navigation
  Scenario: Verify page title
    Given the user navigates to the home page
    Then the title should be "Example Domain"

  @navigation @ui
  Scenario: Verify page elements
    Given the user navigates to the home page
    Then they should see the main title
    And they should see the body content
    And they should see links on the page

  @navigation @links
  Scenario: Verify page links
    Given the user navigates to the home page
    When they count the links on the page
    Then they should find at least one link
    And they should be able to get the list of links

  @navigation @screenshot
  Scenario: Take page screenshot
    Given the user navigates to the home page
    When they take a screenshot
    Then the screenshot should be saved successfully