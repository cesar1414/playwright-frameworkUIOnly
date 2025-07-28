Feature: Simple Test
  As a developer
  I want to verify that the framework works
  To ensure everything is configured correctly

  @simple
  Scenario: Verify that the browser works
    Given the browser is open
    When they navigate to example.com
    Then they should see the page loaded 