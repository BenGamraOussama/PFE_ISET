import { Component } from '@angular/core';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  paymentHandler: any = null;
  constructor() {}
  ngOnInit() {
    this.invokeStripe();
  }
  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PEszHP7NV85VsGsEsheqxn7JK0ND1sDjCqVTd8zHPYPNMpa2N2sLiTNJxuMIMiF4QSerrJaxEUAU7CVDLMo2zwW00P5lKpwPz',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: '',
      description: '',
   
    });
    
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PEszHP7NV85VsGsEsheqxn7JK0ND1sDjCqVTd8zHPYPNMpa2N2sLiTNJxuMIMiF4QSerrJaxEUAU7CVDLMo2zwW00P5lKpwPz',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment effectuée avec success!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
