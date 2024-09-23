import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-panierl',
  templateUrl: './panierl.component.html',
  styleUrls: ['./panierl.component.css']
})
export class PanierlComponent {
  token: string |  null;
  userRole: string | null ;
  userDetails:any
  paymentHandler: any = null;
  constructor(private router:Router, private service:CrudService) {}


  cancel() {
    this.router.navigate(['/panier']);
  }
  ngOnInit() {
    this.invokeStripe();
    this.userDetails = this.service.userDetails();

    //bech na7i connexion ki na3ml login 
    const storedToken = localStorage.getItem('myToken');
    if (storedToken) {
      this.token = storedToken;
    }
    //w naffichi 7aja 7aseb role mta3ha w role n7ote fi login.ts mta3 
    const storedUserRole = localStorage.getItem('role');
    if (storedUserRole) {
      this.userRole = storedUserRole;
    }
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
      name: 'ShopFlow',
      description: 'Test description',
      currency:'dtn',
      email:this.userDetails.email,
    });
    this.router.navigate(['/panier'])
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
