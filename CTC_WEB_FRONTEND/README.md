# CTC Web Frontend

This directory contains the web frontend components for the CTC Market App, built with React.

## Table of Contents

- [Overview](#overview)
- [Installation and Build](#installation-and-build)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [UI Specifications](#ui-specifications)

## Overview

This directory contains the frontend components for the CTC Market App, a community-focused marketplace that connects local growers, producers, and small business owners with residents seeking fresh, affordable, and culturally meaningful foods.

## Installation and Build

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js) or yarn

### Installation Steps

1. Ensure Node.js and npm are installed on your system.
2. Clone the repository: `git clone <repository-url>`
3. Navigate to the CTC_WEB_FRONTEND directory: `cd CTC_WEB_FRONTEND`
4. Install dependencies: `npm install`

### Build and Run

- **Development**: Run `npm start` to start the development server. The app will be available at `http://localhost:3000`.
- **Production Build**: Run `npm run build` to create an optimized production build in the `build` folder.
- **Testing**: Run `npm test` to execute the test suite.

## Usage

This React application provides a web interface for the CTC Market platform. Users can browse events, vendors, products, manage their carts, and complete purchases.

## Project Structure

```
CTC_WEB_FRONTEND/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── screens/
│   ├── context/
│   ├── hooks/
│   ├── modals/
│   ├── styles/
│   └── utils/
├── package.json
└── README.md
```

## Future Development

### Home Section Administration

**Admin Feature: Dynamic Home Section Management**

- Implement admin controls to hide/reveal home screen sections
- Create a section for each item type defined in the database schema
- Use similar modal-based editing approach as event creation/editing

**Admin Feature: Home Banner Image Management**

- Implement modal-based banner image upload/replacement system
- Add image validation (file type, size limits)
- Support for image cropping/resizing
- Database storage for banner image URLs
- Admin preview functionality before publishing changes
- Integration with existing admin controls (button already added below banner)

**Requirements:**

- Banner management modal with:
  - Image upload interface with drag-and-drop support
  - Image preview and cropping tools
  - Multiple banner support for rotation
  - Admin approval workflow for banner changes
- Database integration to persist admin preferences
- Real-time updates to home screen based on admin settings

- Admin dashboard with toggle switches for each section visibility
- Section management modal with:
  - Enable/disable toggles for each product category section
  - Display order controls (drag-and-drop or priority numbers)
  - Section-specific settings (number of items to display, sorting preferences)
- Database integration to persist admin preferences
- Real-time updates to home screen based on admin settings

**Implementation Notes:**

- Follow the same pattern as event admin features (modal-based editing)
- Store section visibility and order in database
- Ensure responsive design adapts to hidden sections
- Add admin-only header button to access section management

### UI/UX Improvements

**Product Card Add to Cart Button Enhancement**

- Improve the sizing and positioning of the "Add to Cart" overlay button to better cover the product image area
- Consider making the clickable area larger while maintaining visual balance
- Test different overlay opacity levels for better visual hierarchy
- Ensure the button remains accessible and clearly indicates its interactive nature

**Implementation Notes:**

- Current overlay covers the bottom portion of product cards but may not provide optimal click area
- Consider adjusting the overlay height and positioning to cover more of the image while preserving product visibility
- Test on various screen sizes to ensure consistent user experience

### User Authentication & Signup System

**Email Notifications & Vendor Approval Process**

**Signup Confirmation Emails:**

- Send confirmation email to all new users upon successful signup
- Email should contain welcome message and account verification link
- Include next steps based on user role (customer vs vendor)
- For vendors: mention that account is pending admin approval

**Vendor Application Process:**

- When vendor signs up, send notification email to admin
- Include vendor details (name, email, application date, business info)
- Create admin interface for reviewing vendor applications
- Add "Pending Applicants" section to vendors screen for admin review

**Vendor Approval/Denial System:**

- Admin can approve or deny vendor applications
- Send decision email to vendor with approval/denial status
- Include optional admin comments in decision emails
- Update vendor account status ('pending' → 'approved'/'denied')
- Prevent denied vendors from accessing vendor features
- Allow approved vendors full access to vendor dashboard

**Implementation Requirements:**

- Email service integration (SendGrid, AWS SES, etc.)
- Database fields for vendor status and admin comments
- Admin-only vendor management interface
- Automated email templates for different scenarios
- User status validation on login/feature access

### Modal Component Refactoring

**Reusable Dropdown Component**

- Extract the vendor/event selection dropdown from AllModal into a reusable component
- Rename component to reflect generic selection functionality (e.g., `SelectionDropdown`)
- Update CSS classes to use generic naming convention
- Modify button activation paths to use new component props
- Support different sorting methods (alphabetical, chronological, etc.) via props
- Enable customization of item display and selection logic

**Implementation Notes:**

- Create `SelectionDropdown.jsx` component with configurable props
- Update `AllModal.jsx` to use the new reusable component
- Ensure backward compatibility with existing vendor selection
- Add support for event selection with date display
- Maintain consistent styling across different usage contexts

## UI Specifications

### General Guidelines

- Each modal will have a close button on the top right, as well as closing when clicking the cancel button or when clicking off modal.
- Use [https://www.connectedtoculture.org/](https://www.connectedtoculture.org/) footer as this is an extension of the site for all pages.
- Establish a testing section in header that uses a switch to toggle between not signed in, customer, vendor, and admin. This will facilitate autheratation for differnt user types during testing

### Home Screen

#### Header

- Logo + text: "CTCMarket" acts as home link
- 4 links: SHOP, VENDORS, ABOUT, EVENTS
- Notification icon/button (available when logged in) + Log In button → links to login screen
- When logged in, there will be a cart icon to the left of the notification icon, links to cart page

#### Body

##### Active Event Section

- Card displays active event
- Image covers card
- Text: event name, event title, brief description (2 lines then ellipsis...)
- Below: event hours + "More Info" button
- Clicking "More Info" links to the active event in the events page
- Event address below hours

##### Fresh Products Section

- Text: "Fresh Products" with nav arrows ← →
- 5 cards
- Card structure: image of product, name below, price range (min - max across vendors) / unit
- On page load, creates array for display, sorts by highest inventory
- Nav arrows cycle through 5 at a time

##### Bakery & Artisan Goods Section

- Text: "Bakery & Artisan goods" with nav arrows ← →
- 5 cards (same structure as Fresh Products)
- On page load, all non-produce goods here, sorted alphabetically

##### Site Services Section

- Text: "Site Services"
- Displays as cards, populates as modal when clicked (hidden by default)
- Include close button, ESC, and off-clicking for closure
- Utilities: map of event, highlights stalls, bathrooms, parking
- Other services: free ingredient cooking stalls, 3rd party affiliates such as food trucks, etc.
- These info will be rendered form the active event desided on by the admin

##### Subscription Prompt Section

- Input field for email + submit button: "Subscribe"

#### Home Screen (Admin and Vendor)

- Shop button now reads "Inventory"

### Login Screen

#### Header

- Not visible

#### Body

- Centered
- Logo: CTC Market
- Card with image of active event (use [] to source active events for rotation)
- Input fields: Email, Password
- Submit button: "Log In"
- Below card: "Not Registered Yet? Sign Up" button links to account creation page (reuse from mobile)

#### Footer

- Not visible

### Events Page

#### Customer / Not Logged In / Vendor View

##### Header

- Visible, "EVENTS" link underlined to display active page

##### Body

- Events listed in chronological order, starting with active event
- Card structure:
  - Event title
  - Event image (possible multiple cycling, establish main one for site use)
  - No text on image
  - Below image: event duration and hours, location, description (paragraph)
- Cards listed vertically, no nav buttons

##### Active Event Section

- Text: "Active Event" (changes based on proximity/border detect logic: previous, active, future event)
- "See Previous Events" button loads older events, turns into nav for up/down cycling 5 at a time
- This section stays pinned below header

##### Event Cards Section

- Lists event cards

##### All Events Section

- Centered text: "All Events"
- Button unhides modal listing events by date
- Allows multiple selected events with checkboxes, load button
- Button at top selects/unselects all

#### Admin Only Features

##### Header

- Next to "All Events" button, "Create Event" button now unhidden

##### Events Modal

- If clicking "Create": title "Create New Event"
- If clicking "Edit": title "Edit Event" (loads existing info)
- Fields:
  - Event name
  - Upload image
  - Calendar selection for start/end date
  - Hours of operation: checkboxes for days (Mon-Sun), 2 inputs per day (AM/PM toggle)
  - Event location: street, city, state, zip
  - Event description (first 50 chars appear on highlight)
- Bottom right: "Finalize Event" button
- Bottom left: "Cancel" button (doesn't erase loaded info for edit)

##### Event Cards (Admin)

- Each card has "Edit Event" button (bottom right of image)
- "Delete" button (top right of image) brings confirmation modal

##### Delete Modal

- Lists event name and dates for selected events

##### All Events Modal (Admin)

- Has "Delete" button next to "Load" button, prompts confirmation

#### Vendor Only Features

##### Event Cards (Vendor)

- Each card has "Set Up Shop" / "Withdraw Shop" button (bottom right of image)
- Button disabled after cutoff period, reads "Event is in preparations"
- After cutoff, if signed up: "Participating"
- For closed events: "Event is over" or "View Event History" (links to inventory page)

- When clicking "Sign Up" before deadline: adds to admin approval, button reads "Sign Up Pending" until approved, then "Signed Up"

### Vendors Page

#### Customer and Not Logged In

##### Header

- Pinned below other header: "All Vendors" button

##### All Vendors Modal

- Similar to events modal, lists vendors alphabetically
- Next to vendors: list of participated events

##### Body

- Lists vendors participating in active/upcoming event
- Card structure:
  - Title: vendor name (link to web page)
  - Image
  - List of participated events
  - Description

#### Vendor View

- Lists their card at top with "Edit" button (bottom right of image)
- Then lists other participating vendors (their card excluded)
- In "All Vendors" modal, their card greyed out, checkbox disabled

#### Admin Only Features

- "All Vendors" has "Delete" button like events
- Each vendor card has "Edit" (bottom right) and "Delete" (top right) buttons
- Edit/Delete sends notification/email to vendor
- Delete confirmation modal lists vendor(s) and events, input field for reason (sent to email)
- Next to each vendor: "Ban/Unban" button unhides modal
- Ban modal: calendar date selection, confirmation lists vendor and events until date
- Ban prevents sign-up for events before ban date

### Shop Page

#### Not Logged In

- Redirects to login page

#### Customer View

##### Header

- All products sub link

##### Body

- Auto-fill based on active event inventory 
- Item cards listed alphabetically, 5 across, unlimited down
- Zero stock items greyed out and disabled, listed last

##### Add to Cart Modal

- Title: "Add to Cart"
- Lists each vendor selling the item: vendor name, item name, unit + amount - price per unit, total, in stock left
- Out of stock vendors greyed out, buttons disabled
- Cancel and "Add to Cart" buttons

#### Vendor View (Shop / Inventory)

##### Header

- Search bar
- "Select Event", "Add Stock", "Import Stock CSV"

##### Select Event

- Unhides "All Events" modal (only approved/participated events)
- Inventory/sales populate based on selected event (useState dominant over modal adjustments)

##### Import CSV

- Modal with 2-row example of column arrangement
- Select upload button, cancel button

##### Body

- Displays inventory for active event
- Cards: image, name, their price, current inventory count
- Clicking card unhides "Tracked Item Inventory" modal

##### Tracked Item Inventory Modal

- Title: item name
- Buttons: line, dot, bar (toggle graph type)
- Graph: Y=count, X=time
- Below graph: ← min hour day event → total history
- Bottom right: scope range, button to select median date/time (calendar/time selection)
- If "Total History": hides median button and scope
- ← → shrink/grow scope, min/hour/day change range
- Graph shows sales during time range
- Bottom buttons: "Add Stock", "Remove Stock", "Track Stock"
- "Track Stock" changes graph to inventory count over time
- Colors: red for removed stock, green for sales decrease, grey for added stock
- Right side: totals (profit, sales, loss, inventory sold/lost/added)

#### Admin View (Shop / Inventory)

- "Import Stock" replaced with "View by Vendors"
- Right of that: "All Items" button
- "View by Vendors" unhides "All Vendors" modal
- "All Items" unhides modal with checkboxes for items
- Radio buttons for priority: Tertiary 1, Tertiary 2
- Items displayed from all vendors/events across selected inputs
- "All Items" card always first, clicking populates modal with summed values
- Modal has "All Events" and "All Vendors" buttons (affect only when modal open)

### About Page

#### Non-Admin

##### Body

- Title, image, description
- Requires more input on layout/structure

#### Admin View

##### Header

- "Edit" button pinned below header

##### Edit About Modal

- Buttons: "Create Image", "Create Title", "Create Sub Title", "Create Paragraph"
- Each populates modal with input/upload
- Drag and drop to reorder
- Titles: H1, Subtitles: H3, Paragraphs: normal text
- Top of each: left/centered/right toggle for positioning
- Bottom: "Finalize" (right), "Cancel" (left)

cart page - customer only
header
see previous orders
pinned below the other header, when clicked will display a list of cards in the sectionm with the astrics, the active cart is listed first followed by newest to oldest.

body
section _
card
div/ displays order number of active cart div/ (space between) div/ order status div/ time that the status was last updated div/
section _

section
cards
card structure is image pinned left, followed by item name with vendor in small greyed out text below.
pinned to the right is - amount + folowed by total item cost dispalyed
in the top right of the card is a circle with a white x as a button that acts as a remove item from cart fucntion

when pressed the entire card becomes greyed out and the amount becomes 0 while the - and + become disabled
the circle with a white x becomes a green circle and a white plus which reverts the change
all items that are added to the cart listed in the section with 1 card per row
section

these 3 sections are arranged as space between, medai views will adjust for vertical instead of horizontal
section
title: billing information

feilds:
name
email address -> auto populates from account details
phone number -> auto populates from account details
checkbox -> enable sms arterts for order status
section

section
toggle: pick up delivery
title: address
fields:
street -> for pick up auto fills with event address
city -> for pick up auto filled with Bellevue,
state / district -> auto filled for washington DC
zip code -> auto filled for events location when pick up is toggled

when delivery is toggled, a red subtext appears that says delivery is only available withing a 10 mile radius of the event location

title: order method
toggle: ASAP pre order
if ASAP is selected then the next available time slot is dsiaplyed
a note below the toggle says please be aware that orders after hours will be accomidated during hours of operation

if pre oder is toggeld a calender icon and time selction button apears next to the toggle, dates and time that are unavalable are grey out while dates and times that are availbe are high lighted green.
will display the finailzed delivery time below the toggle if delivery is selected
section

section
title: payment information
toggle: card government assitance
subtitle: if you are using a snap, ebt, wic, or another source of goverment assitance, please select Government assitance

feilds:
name of card holder  
card number
security code
zip code -> hidden unless required by the card type based upon the fields above

card type icon will switch betweeen visa, mastercard, ect... based upon the the above feilds

submit button reads confirm purchase

if delivery location is more then 10 miles from event address, then the submit button is disabled and reads delivery is to far

cart - vendor view
header
see all orders will be hidden and theere will be see completed order button

this will bring up the all events modal and will poulate the astricked section with orders from the selected events
header

astricked section displayes a list of cards that has all pending orders, sorted by shedulaed time ( regarding pick up or delivery)

each card will have
order number
event name
status
pick up / delivery time

clicking on the card will populate the next section with the oder with the same layoout as the customer view except the close and - + button will be hidden. there will be an edit button to the right of the order number. clicking the edit button will make the hidden buttons reapear. once the edit button is clicked it will read as cancel edit which when pressed will revert the cart to its previous state.

If there are any changes to the order then the submit button on the bottom will open a confirmation modal that list prevous items, amounts and total price and the new cart: item, amount total
below the readout will be an inupt feild for the vendor to add a message about why the order was cahnged
the bottom of the confirmation modal will have a cancle and submit button. this will send an email to the registerd email of the customer with the information in the confiormation email

the section on the bottom will diasplay if it is for pick up or delivery, time of pick up or delivery, and order total

the submit button read process order and will change the order status once clicked
if the order has moved to the next strage with button will be diabled and will read the order status

vendor - admin view
header
oders by event
orders by vendor

similar lagic as before reagarding inventory, using the all events and all vendors modals to filter what is displayed
header

body
a series of switches
order number: up or down
vendor : alphabetic or reversed
order status: listed the available status that an order can have
date completed : up or down

using a switch causes that filer to be the dominate one for the displayed cards in the astricked section

for snap, wic, or ebt purchases please refrence these site and the below
ebt https://www.fns.usda.gov/wic/ebt

SNAP https://dhs.dc.gov/service/supplemental-nutrition-assistance-program-snap

DC Health https://dchealth.dc.gov/release/dc-wic-introduces-electronic-benefit-system-improving-access-food-district-families

1. Program-Specific Integration
   SNAP (EBT): The website must be approved by the USDA as a SNAP-authorized online retailer. This requires meeting USDA Food and Nutrition Service (FNS) eligibility criteria, including a formal application and approval process.
   WIC (eWIC): eWIC is not currently available for online purchases nationwide. As of now, eWIC benefits can only be used in-store at authorized retailers. Any online integration would require state-level approval and technical compatibility with the WIC Electronic Benefits Transfer system, which is not yet standardized for e-commerce.
   Other Programs (TANF, P-EBT): These may be supported depending on state-specific rules and infrastructure, but are typically not available for online grocery purchases.
2. Technical Requirements
   FNS-Approved Payment Gateway: Use a payment processor certified by the USDA FNS to handle SNAP transactions. Examples include NRS Pay, Worldpay, and other FNS-approved EBT processors.
   Secure Data Handling: The system must encrypt and tokenize card data (PAN/PIN) and comply with FNS Operating Rules (OR) and Technical Implementation Guide (TIG) for EBT transactions.
   Transaction Routing: The system must route SNAP transactions through approved processors and support online-only EBT transaction formats.
   Compliance with ANSI Standards: Ensure compatibility with ANSI standards for WIC EBT and SNAP EBT to enable communication between state agencies, retailers, and financial institutions.
3. User Experience & Verification
   Eligible Item Filtering: The website must automatically filter and block non-eligible items (e.g., alcohol, tobacco, hot foods, pet food, household supplies) based on USDA guidelines.
   Benefit Tracking: Display real-time SNAP balance and transaction history to users, similar to in-store EBT systems.
   Verification of Eligibility: Require users to verify their SNAP eligibility status during checkout, often through a secure link to their state’s benefits portal (e.g., MyFamilyBenefits, ConnectEBT).
4. Merchant & Compliance Requirements
   State Authorization: Even if the website is approved by USDA, each state may require additional licensing or certification for online EBT participation.
   No Cross-Use of Benefits: Ensure that WIC and SNAP benefits are not mixed—WIC must be applied first at checkout, followed by SNAP or other payment methods.
   Audit & Reporting: Maintain logs for all transactions to comply with federal and state audits.
5. Current Limitations
   eWIC is not available online—it is only supported in physical stores with compatible POS systems.
   Only a limited number of retailers are authorized to accept SNAP online. As of 2026, the USDA maintains a list of approved online retailers, and new applicants must apply through the FNS Online Purchasing website.

To have your website approved to process WIC and SNAP benefits in Washington, D.C., you must become an authorized retailer for both programs. Here’s what you need to do:

WIC (eWIC) in D.C.

eWIC (electronic WIC) is the system used in D.C. for WIC benefits. Your business must be approved to accept eWIC payments via an electronic point-of-sale (POS) system.
You must apply through the District of Columbia Department of Health (DC Health), which administers the WIC program.
Contact the DC WIC Office directly:
Phone: (202) 442-9397
Email: info.wic@dc.gov
Website: https://www.dchealth.dc.gov/service/apply-wic
You’ll need to:
Complete an application to become a WIC-approved vendor.
Install and certify an eWIC-capable POS system (e.g., a stand-alone terminal or integrated system).
Attend training and pass certification.
Ensure your store sells WIC-eligible foods (e.g., milk, eggs, fruits, vegetables, infant formula, whole grains).
SNAP (EBT)

To process SNAP benefits, your business must be approved by the D.C. Department of Human Services (DHS).
Apply through the SNAP Retailer Application on the D.C. DHS website.
You must:
Have a valid business license.
Accept EBT cards at checkout.
Be open to the public and sell eligible food items.
Pass a retailer eligibility review.
Key Steps:

Visit the DC WIC website: https://www.dcwic.org for WIC vendor resources.
Contact D.C. SNAP Retailer Services: https://www.dchealth.dc.gov/service/snap for SNAP application details.
Confirm POS system is compatible with both eWIC and SNAP EBT.

## CSS Reference

For detailed CSS styling guidelines and conversion of CTC Market website styles to CSS equivalents, see [CSS_REFERENCE_CTC_ORG.md](CSS_REFERENCE_CTC_ORG.md).

## Contributing

Please refer to the main project repository for contribution guidelines.
