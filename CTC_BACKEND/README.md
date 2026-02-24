# CTC Backend (FastAPI)

=======

> > > > > > > bf2436293a411190798d775aa72db3ced5343fc4

Visualization: https://dbdiagram.io/d/699475d7bd82f5fce2f2c751

This directory contains the backend API for the CTC Market App, a multi-vendor farmers-market platform built with FastAPI and PostgreSQL.

## Overview

The CTC Market is a community-focused marketplace that allows customers to browse and purchase from multiple vendors in a single cart, with options for volunteer pick-up or DoorDash delivery. Vendors manage their own inventory with customizable low-stock alerts, and the platform supports physical market stalls with GPS and grid layouts.

## Features

- **Multi-vendor ordering**: Customers can add items from different vendors to one cart.
- **Role-based access**: Separate profiles for customers, vendors, and admins.
- **Inventory management**: Vendors set custom low-stock thresholds with automatic alerts.
- **Order fulfillment**: Volunteer pick-up across stalls or DoorDash integration.
- **Unified cart and orders**: Single table for carts and orders with status transitions.
- **API-first design**: Built for web (React) and future mobile (React Native) clients.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLModel (combines SQLAlchemy and Pydantic)
- **Authentication**: JWT-based (planned)
- **Documentation**: Auto-generated OpenAPI (Swagger UI)

## Database Schema

The database uses a normalized design with the following key tables:

- `users`: Base user table with roles (customer, vendor, admin)
- `customer_profiles` / `vendor_profiles`: Role-specific profile data
- `catalog_items`: Shared produce catalog (admin-maintained)
- `products`: Per-vendor product data (price, stock, thresholds)
- `orders`: Unified cart and order table (status-based)
- `order_items`: Order line items with snapshots
- `events`: Market days
- `stalls`: Physical spots with grid coordinates and GPS
- `vendor_event_bookings`: Links vendors to events and stalls
- Additional tables for payments, fulfillment, etc.

For a visual diagram, see: [Database Diagram](https://dbdiagram.io/d/699475d7bd82f5fce2f2c751)

### Design Decisions

- **Single users table + profiles**: Clean role separation without NULL columns.
- **Unified orders table**: Carts and orders in one, with status for lifecycle.
- **Vendor-custom thresholds**: Automatic stock status updates via triggers.
- **Snapshots in order_items**: Protects historical data from price changes.
- **Events, Stalls & Vendor Bookings**: Events represent market days; stalls are physical spots with grid coordinates and GPS for navigation; vendor_event_bookings link vendors to specific events and stalls for booking management.

## Installation

1. Ensure Python 3.8+ is installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up PostgreSQL database.
4. Configure environment variables (e.g., DATABASE_URL).
5. Run migrations (if using Alembic).

## Running the Application

1. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints

Key endpoints include:

- `POST /auth/login`: User login
- `GET /products`: List products (filtered by vendor)
- `POST /orders`: Create/update cart
- `POST /orders/{id}/checkout`: Process payment
- `GET /orders/{id}/status`: Order status
- pending further feature confermation

## Development

- Models are in `app/models.py`
- Routers in `app/routers/`
- Utils in `app/utils.py`

## Contributing

1. Follow the existing code style.
2. Add tests for new features.
3. Update API docs as needed.

## License

[Add license information here]
