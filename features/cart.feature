Feature: Verify final price accuracy at checkout and Thank You page

Scenario Outline: Complete checkout with different user and shipping details
  Given I have items in the cart
  When I proceed to checkout
  And I fill shipping details with "<FirstName>", "<LastName>", and "<PostalCode>"
  Then I verify the total price accuracy
  And I complete the checkout
  And I verify the Thank You page

Examples:
  | FirstName | LastName | PostalCode |
  | Anju      | Singh    | 12345      |
