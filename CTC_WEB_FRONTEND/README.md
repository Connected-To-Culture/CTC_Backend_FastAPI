# CTC Web Frontend

This directory contains the web frontend components for the CTC Market App, built with React.

## Overview

This directory contains the frontend components for the CTC Market App.

## Links

- [CTC Market Web App Screens](resources/CTC%20Market%20Web%20App%20Screens.pdf)

## Proposed Pages

- **Sample pages for the proposed web app**: Add a button such as "Farmer's market shopping online" on the existing web page [https://www.connectedtoculture.org/](https://www.connectedtoculture.org/) below the cover image. This would navigate to a subdomain similar to "community.connectedtoculture.org/web/lite/store/<app_id>" and provide a clean separation from the existing website and the CTC market web app.

## Proposed Pages

- **Sample pages for the proposed web app**: Add a button such as "Farmer's market shopping online" on the existing web page [https://www.connectedtoculture.org/](https://www.connectedtoculture.org/) below the cover image. This would navigate to a subdomain similar to "community.connectedtoculture.org/web/lite/store/<app_id>" and provide a clean separation from the existing website and the CTC market web app.

login screen

logo

product name = CTC market
slogan = fresh produce, feed everyone
switch -> "I am a [Customer, Vendor, Admin]
input field -> "enter your email"
input field -> " Password"
link = "forgot password"
button = "log In"
span "Or log in with" span
links using icons: google, facebook, apple
"dont have an account? Sign Up" <-link

Sign Up Screen

link <- back arrow title "Create Account"

logo
product name = CTC market
slogan = fresh produce, feed everyone
button "Sign Up with Google"
button "Sign Up with Apple"
span "Or" span
input field = "Username"
input field = "Email"
input field = "Phone" input field = "Zip Code"
button, -> drop down = "I am a:" Admin, Vendor, Customer
input field = "Password"
input field = "Confirm Password"
checkbox "By signing up, you agree to our ^terms of service^ and ^Privacy^" 2x <- links
button "Sign Up"
"Already have han account? Login" <-link

Vendor Sign Up and Product display

link <- back arrow title "become a Vendor"
text "Join our marketplace"
text "Join our market palce and reach thousands of new customers.
input field -> "Company Name"
input field -> "Full Adress"
input field -> "Contact Email"
input field -> "contact Phone"
button "Attach Documents"
text " upload your business license and food saftey certificates.
button "Submit for Approval"
text " by submitting, you agree to our ^terms of service^ and ^Privacy^" 2x <- links
span
text "Your Products, Beautifully Displayed"
cards -> image of food item with name then price underneath, 4 cards in 2x2. possible fade in and out, rotating list from array?

Vendor Home Page

logo? product name = CTC market button "setting icon"
slogan = fresh produce, feed everyone

card "today's sales" card "active orders"
"trackedf amount" "tracked orders that are active"
possible possible fade in andout,
swapping from daily, weekly, monthly, ytd?

card "low in stock"
"tracks number of items that are low in stock"
customizable paramiters for how much is low, spacefic to each item?

text "Today's Orders"
switch "online Orders" / "In-store pickups" tracks and displayes indiviual orders as cards with ordfer #, name, # of items in order, time order was placed, and order status: new, preparing, ready

text "Inventory at a glance"
tracks inventory, displays as cards, cards are left right scrolling, possible automallicly with manual scroll and pass for min after manual to resume automated?
cards are an imagfe of product with name below then tracked count

                                button "white plus icon in green circle"

Customer home page

logo? product name = CTC market button "shoping cart"
slogan = fresh produce, feed everyone

cards scrolling left and right, tracks events, image for upper half with description on lower [titel and time in bold with summer below in regular]- button on the bottom to add to calander- if using google, or apple be sure to track to accounts calnder

input field -> "search for products or vendors"

buttons scrolling left and right that toggle cards below _potentail conflict with scrolling and clicking, be sure to distinguish for mobile as single tap and depressed + movement_
"Fresh Produce" "Bakery" "Dairy and Eggs" ect...

text "New Arrivals"
cards have image on top with name below followed by price, add to cart button in the bottom right of card
cards are displayed in 2x2 with scrolling down and up

_This setup has potential conflicts as there may be more than 1 vendor with the same item for sale,_ _suggesting a modal with a list of vendors that have stock. If different vendors are charging different_ _amounts, have the display card show the average and the vendor list each display their pricing_
_potential for favored vendor status for redirect to vendor selection_

cart page

link <- back arrow title "Your Cart (tracks item amount) items"
cards displays picture on left with name of item in middle with toal price below, on right side is # of items for this card with increas and decrease by - and + button

card "Subtotal" tracked total
"Taxes and Fees" calculated
span
"Total" summ

card with promt to check for free food and delivery, if already qualified then says that you do, if not recomend keep hidden or repromt if there have been any finnacail changes since last authentication proccess

button "proceed to checkout"
_recommend replacing the "proceed to check out" button with 2 buttons that redirects for delivery and in store pick up. as well as adding the ability to swap between the 2 options_
_also consider adding pick up time / delivery time, effectively a pre order, restricted to duration of events and availability, will need to employ some scheduling logic_

Payment Page

link <- back arrow title "Payment"

text "Order Summary
card "Subtotal" tracked total
"Delivey Fee" calculated _if applicable_
"Taxes and Fees" calculated
span
"Total" sum

text "payment Method"
card
selection of saved payment methods seperated by a span with radio button on the end

button " + Add Credit/Debit Card"

text "Have a promo code?" drop down selction with shevron
card
text lock icon "Secure SSL encryption"
button "Pay tacked amount"

Add Delivery address Form

link <- back arrow title "Add Delivery Address"
span
button "Use my current Location"
input field -> "Country/Region"
input field -> "Full Name"
input field -> "Phone Number"
input field -> "Street address"
input field -> "Apt, Unit, Suite
