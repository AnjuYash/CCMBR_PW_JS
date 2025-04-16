Feature: Adding Items to the Cart

Scenario: Verify adding products to the cart and sorting items
  Given User logged into SauceDemo
  When User add items to the cart
  Then User should see the selected items in the cart
