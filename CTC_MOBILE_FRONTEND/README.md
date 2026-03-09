# CTC Mobile Frontend

This directory contains the mobile frontend for the CTC Market App, built with React Native.

## Overview

The mobile app provides the same functionality as the web frontend but optimized for mobile devices, including login, product browsing, ordering, and vendor management.

## Links

- [Front end examples](https://stitch.withgoogle.com/projects/8235591339956639864)

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install Dependencies

```sh
npm install
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

```sh
npm start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane and use one of the following commands:

### Android

```sh
npm run android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

Then run:

```sh
npm run ios
```

## Features

- User authentication (Login/Signup)
- Customer dashboard with product browsing
- Vendor dashboard with inventory management
- Order tracking
- Integration with CTC Backend API

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Notes Regarding Link For Mobile Screen

### Login Screen

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

### Sign Up Screen

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
- Button/Dropdown: "I am a:" Admin, Vendor, Customer
- Input field: "Password"
- Input field: "Confirm Password"
- Checkbox: "By signing up, you agree to our [Terms of Service](link) and [Privacy Policy](link)"
- Button: "Sign Up"
- Link: "Already have an account? Login"

### Vendor Sign Up and Product Display

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
- Text: "By submitting, you agree to our [Terms of Service](link) and [Privacy Policy](link)"
- Span
- Text: "Your Products, Beautifully Displayed"
- Cards: Image of food item with name and price underneath, 4 cards in 2x2 grid. Possible fade in/out, rotating list from array.

### Vendor Home Page

- Logo/Product name: CTC Market, Button: "Settings icon"
- Slogan: Fresh produce, feed everyone
- Card: "Today's Sales", Card: "Active Orders"
  - "Tracked amount", "Tracked orders that are active"
  - Possible fade in/out, swapping from daily, weekly, monthly, YTD
- Card: "Low in Stock"
  - "Tracks number of items that are low in stock"
  - Customizable parameters for how much is low, specific to each item
- Text: "Today's Orders"
- Switch: "Online Orders" / "In-Store Pickups"
  - Tracks and displays individual orders as cards with order #, name, # of items, time placed, status: new, preparing, ready
- Text: "Inventory at a Glance"
  - Tracks inventory, displays as cards, left-right scrolling, possibly automatic with manual scroll pause
  - Cards: Image of product with name below, tracked count
- Button: White plus icon in green circle

### Customer Home Page

- Logo/Product name: CTC Market, Button: "Shopping Cart"
- Slogan: Fresh produce, feed everyone
- Cards scrolling left/right: Tracks events, image upper half with description lower (title and time in bold, summary below)
  - Button: "Add to Calendar" (integrate with Google/Apple calendar)
- Input field: "Search for products or vendors"
- Buttons scrolling left/right: Toggle cards below (distinguish tap vs scroll on mobile)
  - "Fresh Produce", "Bakery", "Dairy and Eggs", etc.
- Text: "New Arrivals"
- Cards: Image on top, name below, price, "Add to Cart" button bottom right
  - Displayed in 2x2 grid with vertical scrolling

_This setup has potential conflicts as there may be more than 1 vendor with the same item for sale, suggesting a modal with a list of vendors that have stock. If different vendors charge different amounts, have the display card show the average and the vendor list each display their pricing. Potential for favored vendor status for redirect to vendor selection._

### Cart Page

- Link: Back arrow, title "Your Cart (tracks item amount) items"
- Cards: Picture on left, name in middle, total price below, on right # of items with +/- buttons
- Card: "Subtotal" (tracked total)
- "Taxes and Fees" (calculated)
- Span
- "Total" (sum)
- Card: Prompt to check for free food and delivery eligibility
  - If qualified, indicates so; if not, recommend hiding or re-prompting if financial changes occurred
- Button: "Proceed to Checkout"
  - _Recommend replacing with 2 buttons for Delivery and In-Store Pickup, adding ability to swap options. Also consider adding pickup/delivery time selection, effectively a pre-order restricted to event duration and availability, requiring scheduling logic._

### Payment Page

- Link: Back arrow, title "Payment"
- Text: "Order Summary"
- Card: "Subtotal" (tracked total)
- "Delivery Fee" (calculated, if applicable)
- "Taxes and Fees" (calculated)
- Span
- "Total" (sum)
- Text: "Payment Method"
- Card: Selection of saved payment methods with radio buttons
- Button: "+ Add Credit/Debit Card"
- Text: "Have a promo code?" (dropdown with chevron)
- Card: Lock icon "Secure SSL encryption"
- Button: "Pay [tracked amount]"

### Add Delivery Address Form

- Link: Back arrow, title "Add Delivery Address"
- Span
- Button: "Use My Current Location"
- Input field: "Country/Region"
- Input field: "Full Name"
- Input field: "Phone Number"
- Input field: "Street Address"
- Input field: "Apt, Unit, Suite"
