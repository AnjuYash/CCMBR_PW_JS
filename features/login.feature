@login
Feature: User Login on SauceDemo
  As a user
  want to log in to SauceDemo with valid credentials
  So that I can access the application successfully

  Background:
    Given User on the SauceDemo login page

  Scenario Outline: Verify login with user credentials
    When User log in with "<Username>" and "<Password>"
    Then User should be logged in successfully

  Examples:
    | Username        | Password      |
    | standard_user   | secret_sauce  |
