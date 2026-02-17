# CTC Frontend Diagrams and Wireframes

## Overview

This document outlines the proposed UI/UX designs and wireframes for the CTC Market App frontend.

## Links

- [Front end examples](https://stitch.withgoogle.com/projects/8235591339956639864)

## Proposed Pages

- **Sample pages for the proposed web app**: Add a button such as "Farmer's market shopping online" on the existing web page [https://www.connectedtoculture.org/](https://www.connectedtoculture.org/) below the cover image. This would navigate to a subdomain similar to "community.connectedtoculture.org/web/lite/store/<app_id>" and provide a clean separation from the existing website and the CTC market web app.

## Login Screen

- Logo
- Product name: CTC Market
- Slogan: Fresh produce, feed everyone
- Switch: "I am a [Customer, Vendor, Admin]"
- Input field: "Enter your email"
- Input field: "Password"
- Link: "Forgot password"
- Button: "Log In"
- Span: "Or log in with"
- Links with icons: Google, Facebook, Apple
- Link: "Don't have an account? Sign Up"

## Sign Up Screen

- Link: Back arrow, title "Create Account"
- Logo
- Product name: CTC Market
- Slogan: Fresh produce, feed everyone
- Button: "Sign Up with Google"
- Button: "Sign Up with Apple"
- Span: "Or"
- Input field: "Username"
- Input field: "Email"
- Input field: "Phone"
- Input field: "Zip Code"
- Button/Dropdown: "I am a:" (Admin, Vendor, Customer)
- Input field: "Password"
- Input field: "Confirm Password"
- Checkbox: "By signing up, you agree to our [Terms of Service](link) and [Privacy](link)"
- Button: "Sign Up"
- Link: "Already have an account? Login"

## Vendor Sign Up and Product Display

- Link: Back arrow, title "Become a Vendor"
- Text: "Join our marketplace"
- Text: "Join our marketplace and reach thousands of new customers."
- Input field: "Company Name"
- Input field: "Full Address"
- Input field: "Contact Email"
- Input field: "Contact Phone"
- Button: "Attach Documents"
- Text: "Upload your business license and food safety certificates."
- Button: "Submit for Approval"
- Text: "By submitting, you agree to our [Terms of Service](link) and [Privacy](link)"
- Text: "Your Products, Beautifully Displayed"
- Cards: Image of food item with name and price underneath (4 cards in 2x2, possible fade in/out rotating list)

## Vendor Home Page

- Logo/Product name: CTC Market, Button: "Settings icon"
- Slogan: Fresh produce, feed everyone
- Card: "Today's Sales", Card: "Active Orders" (tracked amounts, possible fade in/out for daily/weekly/monthly/YTD)
- Card: "Low in Stock" (tracks number of items low in stock, customizable parameters)
- Text: "Today's Orders"
- Switch: "Online Orders" / "In-store Pickups" (displays individual orders as cards with order #, name, # of items, time, status: new, preparing, ready)
- Text: "Inventory at a Glance"
- Cards: Image of product with name and tracked count (left-right scrolling, auto/manual)
- Button: White plus icon in green circle

## Customer Home Page

- Logo/Product name: CTC Market, Button: "Shopping Cart"
- Slogan: Fresh produce, feed everyone
- Cards: Scrolling events (image, title, time, description, button to add to calendar)
- Input field: "Search for products or vendors"
- Buttons: Scrolling categories ("Fresh Produce", "Bakery", "Dairy and Eggs", etc.)
- Text: "New Arrivals"
- Cards: Image, name, price, "Add to Cart" button (2x2 grid, scroll up/down)
- _Note_: Potential conflicts with multiple vendors; suggest modal for vendor selection with pricing.

## Cart Page

- Link: Back arrow, title "Your Cart (item count) items"
- Cards: Picture, name, total price, quantity with +/- buttons
- Card: "Subtotal", "Taxes and Fees", "Total"
- Card: Prompt for free food/delivery eligibility
- Button: "Proceed to Checkout"
- _Recommendation_: Replace with "Delivery" and "In-store Pickup" buttons; add scheduling for pickup/delivery times.

## Payment Page

- Link: Back arrow, title "Payment"
- Text: "Order Summary"
- Card: "Subtotal", "Delivery Fee" (if applicable), "Taxes and Fees", "Total"
- Text: "Payment Method"
- Card: Selection of saved methods with radio buttons
- Button: "+ Add Credit/Debit Card"
- Text: "Have a promo code?" (dropdown)
- Card: Lock icon "Secure SSL encryption"
- Button: "Pay [amount]"

## Add Delivery Address Form

- Link: Back arrow, title "Add Delivery Address"
- Button: "Use my current Location"
- Input fields: Country/Region, Full Name, Phone Number, Street Address, Apt/Unit (optional), City, State (dropdown), Zip Code
- Checkbox: "Set as default delivery address"
- Button: "Save Address"

## Thank You / Order Confirmation Page

- Icon
- Text: "Thank you!"
- Text: "Your order is confirmed. You have been securely logged out."
- Button: "Return to Sign In"
- _Recommendation_: Option to log out or return home; auto-logout on idle with modal.

## Admin Panel

- Logo/Product name: CTC Market, Button: "Alert icon"
- Slogan: Fresh produce, feed everyone
- Button: "+ Create Farmer's Market Event"
- Text: "Vendor Management"
- Search bar
- Switch: "Pending" / "Active" / "Rejected"
- Cards: Vendor info (icon, name, type, status for pending: "Awaiting Approval", buttons "Reject"/"Approve")
- Text: "Inventory"
- Card: "Low Stock Items", "Out of Stock", "Total Products" (with "View All >")
- Text: "Orders"
- Card: "New Orders", "Pending Fulfillment", "Total Sales Today" (with "View All >")
- Bottom bar: Buttons "Dashboard", "Orders", "Inventory", "Vendors" (with icons)

## Create Farmer's Market Event Page

- Link: Back arrow, title "Create Farmer's Market Event", Button "Cancel"
- Text: "Add a Cover Image"
- Button: "Tap/Click to upload event image"
- Input fields: Event Name, Location
- Buttons: Date icon, Time icon
- Text: "What makes this event special?"
- Input field: Summary of event
- Card: Button "Publish Event"
- _Note_: Implement memo for form preservation on back; clear on cancel.

## Critical Products List

- Link: Back arrow, title "Critical Products", Button: Menu icon
- Search bar
- Cards: Image, name, count, SKU, vendor (with > arrow)
- Overlays: "Out of Stock" (faded red X), "Low Stock" (yellow border)
- _Recommendation_: Add vendor name/icon; distinguish critical inventory.
