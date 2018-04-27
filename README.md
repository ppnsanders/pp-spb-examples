# PayPal Smart Payment Buttons Example Apps

-----

> **Disclaimer:** The applications provided here and all code is provided as-is.  These examples are intended to be **EXAMPLES** and are not intended to be used in a production environment.  I am employed at PayPal, however, the code herein is provided from myself as an example not from PayPal, Inc.  I hope these are helpful to helping you understand the API's, but please do not use in a production environment.

## Setup & Install

1. Clone this Repo `$ git clone https://github.com/ppnsanders/pp-spb-examples.git`
2. Run `$ cd pp-spb-examples`
3. Run `$ npm install`
4. Run `$ node install.js`
5. Run `$ node setup.js`  //See the [configuration section below](https://github.com/ppnsanders/pp-spb-examples#configuration) for details.

## Running the Demo App

This repository currently contains 1 independent application:

1. [pp-ec-kraken-angular](https://github.com/ppnsanders/pp-spb-examples/tree/master/pp-ec-kraken-angular)

I have built these as individual applications to ensure that you can test/demo the specific pieces you want to use and don't need to run all of them or look through multiple files of code to see how it all works.

Once you have ran the initial Setup & Install, you can then run the following commands:

1. Run `$ cd pp-ec-kraken-angular`
2. Run `$ npm start`

The Setup & Install already installed all the NPM dependencies for all of the apps, so this should start up without any issues.  You would change the `pp-ec-kraken-angular` in the above command to the appropriate directory for the app you want to run (i.e. `pp-ec-kraken-angular`, more coming soon..).

## Configuration

When you run `$ node setup.js` you'll be prompted for your `client_id`, `client_secret`, `email`, `payerId`, `brandName`, and `environment`.

Information you'll need:

```json
{
	"client_id": "<YOUR CLIENT ID>",
	"client_secret": "<YOUR CLIENT SECRET>",
	"email": "<YOUR MERCHANT ACCOUNT EMAIL>",
	"payerId": "<YOUR MERCHANT MERCHANT ID>",
	"brandName": "<YOUR MERCHANT BRAND NAME>",
	"environment": "sandbox",
	"username": "<YOUR API USERNAME>",
	"password": "<YOUR API PASSWORD>",
	"signature": "<YOUR API SIGNATURE>"
}
```

| Variable Name | Description |
|:-------------:| ----------- |
| `client_id`   | This is the `client_id` associated with your app from [developer.paypal.com](https://developer.paypal.com/developer/applications/) |
| `client_secret` | This is the `client_secret` associated with your app from [developer.paypal.com](https://developer.paypal.com/developer/applications/) |
| `email` | This is the email address associated with your PayPal account. |
| `payerId` | This is the "Merchant ID" or "Payer ID" associated with your PayPal account. |
| `brandName` | This is your Merchant "Brand Name", this may be the name of your company or application. |
| `environment` | This is the environment you wish to test with.  Default value is `sandbox` |
| `username` | This is the Legacy API Credentials and is the API username. |
| `password` | This is the Legacy API Credentials and is the API password. |
| `signature` | This is the Legacy API Credentials and is the API signature. | 

> If you are using PayPal's legacy API, your API Username, Password, and Signature can be found in the PayPal Account Profile.  If you are using REST, you can leave these fields empty when `setup.js` runs and prompts you for them.

## PayPal Express Checkout - REST

1. [pp-ec-kraken-angular](https://github.com/ppnsanders/pp-spb-examples/tree/master/pp-ec-kraken-angular)

### pp-ec-kraken-angular

**Description:** This application uses the [KrakenJS](http://krakenjs.com/) framework for the server-side, and `v1.6` of the [AngularJS](https://angularjs.org/) framework for the client-side. 

*Consumer Experience Steps:*

1. Add items to Cart
2. Checkout with PayPal
3. Return to Merchant site
4. Confirm Payment

*App/API Steps:*

1. Merchant Credentials are saved to the application.
2. A Cart is shown, items are added to the cart.
3. Clicking the Checkout with PayPal button calls [Create Payment](https://developer.paypal.com/docs/api/payments/#payment_create) a `token` is returned.
4. The token is returned to `checkout.js` via the `resolve()` function, and PayPal renders the checkout page.
5. The `onAuthorize()` callback is sent from PayPal, the data is stored in a cookie by [AngularJS](https://angularjs.org/), and the directive switches to `<return-page>`.
6. The data from the `onAuthorize()` callback is shown and a Server call is made to [Get Payment Details](https://developer.paypal.com/docs/api/payments/#payment_get).
7. A response is received with the Payment Details and they are shown on the page.  Then clicking the "Execute Payment" button will call [Payment Execute](https://developer.paypal.com/docs/api/payments/#payment_execute) to complete the payment.


