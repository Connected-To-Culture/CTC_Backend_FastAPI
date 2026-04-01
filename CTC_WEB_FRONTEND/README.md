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
# CTC Web Frontend

This directory contains the web frontend components for the CTC Market App, built with React.

## Table of Contents

- [Overview](#overview)
- [Implemented Features](#implemented-features)
- [Installation and Build](#installation-and-build)
- [Usage & Behavior Notes](#usage--behavior-notes)
- [Project Structure](#project-structure)
- [Planned Work](#planned-work)
- [UI Specifications](#ui-specifications)

## Overview

This folder contains the React-based web frontend for the CTC Market platform (vendor/event/product browsing, admin flows, and customer shopping experience).

## Implemented Features (selected)

The README has been updated to reflect features implemented in the current branch. Key items implemented include:

- Dropdowns & selection modals (see `src/modals/AllModal.jsx`):
  - Reusable dropdown content extracted and used for both vendor and event selection.
  - Both dropdown buttons remain in the DOM; visibility is controlled by `userRole` (admin/customer/vendor).
  - Select All / Deselect All checkbox included in both dropdowns.
  - Modal-local temporary selection (`tempSelectedVendors`, `tempSelectedEventIds`) so multiple choices can be made and only committed when `Apply` is clicked.
  - Overlay click closes dropdown; `Apply` and `Cancel` buttons behave as expected.
- UI behavior and styles (see `src/styles/AllModal.css`):
  - Dropdown grids force 5 fixed rows per column (`grid-template-rows: repeat(5, ...)`) to remove vertical scrollbars and maintain consistent column heights.
  - Right-aligned `Cancel` / `Apply` actions with 20px gap.
  - Fallbacks when data is missing: default vendor (`CTC Market`) and default event (`DC Farmers Market (Summer 2026)`).
- Product card and metadata handling:
  - New `useProductMeta` hook centralizes product name, price/unit formatting, and vendor list generation with sensible fallbacks.
  - `useProductCard` supports `hideNameAndPrice` and accepts injected `metaElements` so `AllModal` renders name/price/vendors outside of the internal card layout (keeps card layout consistent across contexts).

Files with notable changes: `src/modals/AllModal.jsx`, `src/styles/AllModal.css`, `src/hooks/useProductCard.js`, `src/hooks/useProductMeta.js`.

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

- **Development**: Run `npm start` to start the development server. If port 3000 is already in use, the dev server will prompt to run on another port (e.g., 3002).
- **Production Build**: Run `npm run build` to create an optimized production build in the `build` folder.
- **Testing**: Run `npm test` to execute the test suite.

## Usage & Behavior Notes

- Vendor/Event selection: use the dropdown buttons in the top-right of the modal (visibility depends on signed-in role). The dropdowns support multi-selection with a "Select All" checkbox and require pressing `Apply` to commit selections.
- Fallbacks: when vendor or event lists are empty, the UI shows `CTC Market` (vendor) and `DC Farmers Market (Summer 2026)` (event) as sensible defaults.
- Product cards in the All modal: the internal `renderProductCard` hides name/price/unit for a compact card display; `AllModal` injects product meta (name / price/unit / vendors) to the right of the item count using `useProductMeta`.

## Project Structure

```

CTC_WEB_FRONTEND/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ ├── screens/
│ ├── context/
│ ├── hooks/ # contains useProductCard, useProductMeta, etc.
│ ├── modals/ # AllModal and related modal content
│ ├── styles/ # AllModal.css and other styles
│ └── utils/
├── package.json
└── README.md

```

## Planned Work (remaining / future)

The following features are still planned and described here for visibility:

- Home Section Administration (admin UI for toggling home sections, banner management, persistence in DB).
- Product card Add-to-Cart overlay improvements (accessibility and sizing tests).
- Full user authentication flows, email notifications, and vendor approval/management workflows.
- Additional polishing: keyboard accessibility, ARIA labels, and UX tweaks across modals.

If you'd like, I can update this README to add a short changelog with dates and commit references for the items above.

## UI Specifications

See the `src/styles` folder for current CSS. The README focuses on developer-facing notes; UI design specs remain in the project docs and should be updated as visual changes are made.

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
```
