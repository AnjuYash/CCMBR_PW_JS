Feature: Adding Items to the Cart

Scenario: Verify adding products to the cart and sorting items
  Given I am logged into SauceDemo
  When I add items to the cart
  Then I should see the selected items in the cart
