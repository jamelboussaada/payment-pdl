```mermaid
usecaseDiagram
    actor Customer
    actor Administrator
    actor "Payment System" as PaymentGateway

    rectangle "E-commerce Platform" {
        Customer -- (Register)
        Customer -- (Login)
        Customer -- (Browse Products)
        Customer -- (Manage Cart)
        Customer -- (Checkout)
        Customer -- (View Order History)

        Administrator -- (Manage Products)
        Administrator -- (Manage Users)
        Administrator -- (View All Orders)

        (Checkout) ..> (Make Payment) : <<include>>
        (Checkout) ..> (Login) : <<include>>
        (View Order History) ..> (Download Invoice) : <<extend>>

        (Make Payment) -- PaymentGateway
    }
```