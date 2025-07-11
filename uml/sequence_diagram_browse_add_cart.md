```mermaid
sequenceDiagram
    actor Customer
    participant Frontend as E-commerce Frontend
    participant ProductBackend as Product Backend

    Customer->>Frontend: Navigates to Products Page
    Frontend->>ProductBackend: GET /api/produits (Request All Products)
    ProductBackend-->>Frontend: List of Products
    Frontend-->>Customer: Displays Products

    Customer->>Frontend: Selects Product & Adds to Cart
    Frontend->>Frontend: Updates Local Cart State
    Frontend-->>Customer: Shows Item Added to Cart
```