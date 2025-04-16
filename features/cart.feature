Feature: Verify final price accuracy at checkout and Thank You page

Scenario Outline: Complete checkout with different user and shipping details
  Given User have items in the cart
  When User proceed to checkout
  And User fill shipping details with "<FirstName>", "<LastName>", and "<PostalCode>"
  Then User verify the total price accuracy
  And User complete the checkout
  Then User verify the Thank You page

Examples:
  | FirstName | LastName | PostalCode |
  | Anju      | Singh    | 12345      |
