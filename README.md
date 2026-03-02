# CTC Market App

## Overview

A community-focused marketplace to life, allowing:

- Greater access to fresh, affordable, culturally meaningful foods.
- Local growers, producers, and small business owners to reach more residents.
- A smoother, modernized market experience that supports long-term food sustainability.
- Community members to engage more easily with healthy, local food systems.

## Tech Stack

### Adopted Technologies

- **Backend**: FastAPI (Python) - Selected for its high performance and simplicity in building APIs.
- **Web Frontend**: React - Used for building the user interface for the web application.
- **Mobile Frontend**: React Native - Employed for cross-platform mobile app development.
- **Database**: MongoDB - Chosen for its flexibility with document-based storage.
- **Payment Systems**: Integrated options under consideration (Square, Stripe, PayPal, etc.) for secure transactions.

### Considered but Not Adopted

- PERN stack (Postgres, Express, React Native, Node.js) - Evaluated but not selected due to preference for FastAPI and MongoDB.
- Java Spring Boot & MongoDB - Considered for enterprise features but opted for lighter Python-based stack.

## Project Description

### Architecture

- currently reviewing subscription offers
  = limit of 500 across the summer event, potentail for an extra 1000. Strongly hopes not to exceed the 500 limit. The 500 is strictly for software expenditure.

### Geographic Focus and Timeline

- **Focus Area**: Neighborhood of Bellevue, Washington DC.
- **Timeline**: Physical farmer's market event planned for every Saturday of Summer 2026.
- **Growth Plans**: No plans to extend outside the designated launch area initially. May develop a mobile application if received well.

### Metrics and Goals

- As a non-profit organization, focus is not on profits but on:
  - How many needy people are fed with the groceries provided.
  - Helping small vendors promote their business.
- Goalposts: Measure success by community impact rather than financial metrics.

### Monetization

- Primary focus on lower operational costs; avoid subscription services that transition to paid after thresholds.
- Revenue Sources:
  - Sponsorship and donations.
  - Minimal fees from vendors to set up stalls.
  - Spending on DoorDash for shipping.
  - Sponsoring free food/free food+free delivery for eligible people.
- No surplus revenue generation through the app; focus on self-developed components instead of 3rd party services.

### Development Plans

- Building webscreens frontends for Summer 2026.
- Web frontend using React.
  = Upon posituve reception of webscreen deployment, move to devlope app based
  = A quasi P2P architecture could be possible at a later date but would require hardware investments
- Mobile frontend using React Native.
- Refer to this [link](https://www.connectedtoculture.org/ctc-market) for other info related to the CTC Market app.
- Marketplace or e-commerce flow structure
- API
- Authentication

## Installation

[Add setup instructions here]

## Discussion Points

- **User Authentication Methodology**: JWT tokens or using Clerk middleware.
- **Product Images**: Cloudinary middleware or other suggestions.
- **Front End Web Pages**: Using Squarespace (already having subscription) or WordPress.
- **Automated Order Upload to DoorDash**: Way to automatically upload the set of orders received in real time into the DoorDash bulk order .csv file for every 1 hour, despite their API not being shared — microservices or other suggestions.
- **Google Maps API Integration**: Taking advantage of Google Maps API to indicate to customers that online delivery is only available within 10 miles of the physical market — ways to implement.
- **Customer Validation for Free Food/Delivery**: Ways to validate customers eligible for free food or free food + free delivery — upload household income documents and validate manually or use document reader 3rd party resources.
- **Low-Cost Deployment Platform**: Render for backend / Digital Ocean for the entire application / Sevalla for both front end and backend / Dream Host for web hosting and Domain Name Registrar or other options.

## Diagrams

### Basic Architecture Diagram - Version 1

```
Web Application      Mobile Application
       |                      |
    API Gateway            API Gateway
       |                      |
    Database                 Database
       |________________________|_______________
       |            |           |               |
    +---+           +---+       +---+           +---+
    | 1 |           | 2 |       | 3 |           | 4 |
    +---+           +---+       +---+           +---+
Microservice     Payment     Delivery     Notification
(Admin Panel,    Services    Services     Services
 Customer View,   -> 3rd     -> 3rd       (Email, SMS)
 Vendor View)     Party      Party
                  (Zelle)    (DoorDash)
```

### User Flow Diagram - Version 1

```
Landing Page
     |
[Already Signed Up?]
     | \
   Yes  No
     |   |
     |   Set Up Account --> Enter Name and Role
     |   |
     +--- Enter Email Address
         |
     Enter Password
         |
     Home Page
     |
     |_________________________________________________
     |                       |                        |
     +----------------+      +----------------+       +----------------+
     | Admin          |      | Vendor         |       | Customer       |
     +----------------+      +----------------+       +----------------+
     | Create Event   |      | Create Product |       | Profile        |
     | Page           |      | Details        |       | (Delivery Addr,|
     | Product/Vendor |      | List of        |       | Payment Method)|
     | Inventory Mgmt |      | Products       |       | Eligibility    |
     | Orders,        |      | Inventory Mgmt |       | Assessment     |
     | Shipments,     |      | (Online/Market)|       | Cart (Proceed, |
     | Payments       |      | Orders,        |       | Save, Delete)  |
     |                |      | Shipments,     |       | Orders,        |
     |                |      | Payments       |       | Payments       |
     +----------------+      +----------------+       +----------------+
     |_______________________|________________________|
                             |
                          Logout
```

### Discusion points

[Google Docs Link](https://docs.google.com/document/d/11tacjdbUPIwXenR4MepCoKVCsYY9mZieamcxto6VMCM/edit?tab=t.0)
