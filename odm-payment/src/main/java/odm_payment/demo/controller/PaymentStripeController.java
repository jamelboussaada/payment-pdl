package odm_payment.demo.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import odm_payment.demo.dto.PaymentRequest;
import odm_payment.demo.dto.PaymentResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentStripeController {

    @PostMapping("/pay")
    public PaymentResponse createCheckoutSession(@RequestBody PaymentRequest request,
                                        @RequestHeader String userEmail) throws StripeException {
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("https://localhost:4200/successpurchase")
                        .setCancelUrl("https://localhost:4200/failedpurchase")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("usd")
                                                        .setUnitAmount(request.getAmount() * 100L)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Service Payment")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .setCustomerEmail(userEmail)
                        .build();

        Session session = Session.create(params);

        return new PaymentResponse(session.getUrl());
    }
}