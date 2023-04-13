---
readingTime: 10
title: How to Create a Stripe Subscription Service with as Few Lines of Code as Possible
description: After creating a team billing service, I was amazed at how incredible Stripe Checkout Sessions were. Collecting payments from customers is hard. There are many possible cases to consider such as verifying payment information, international banking standards, and intermediate bank verification steps....
authorName: Mohnish Aggarwal
authorImage: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/headshots%2Fmohnish.jpg?alt=media&token=a4e7587c-618a-41b9-85de-e59731319e3e'
date: 2022-03-10T5:30:00.000-05:00
category: Coding
categoryClass: bg-indigo-100
categoryText: text-indigo-800
image: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fcheckout-page.png?alt=media&token=49a6406f-2be8-4b18-ad99-a9821d73fd60'
---

After creating [Blankly Finance’s](https://blankly.finance) team billing service, I was amazed at how incredible Stripe Checkout Sessions were. Collecting payments from customers is hard. There are many possible cases to consider such as verifying payment information, international banking standards, and intermediate bank verification steps. [Stripe Sessions](https://stripe.com/docs/api/checkout/sessions) handles all this and just requires you the developer to create products in their very user friendly and intuitive dashboard, create an endpoint to begin a session, and reroute the user to the session. I will show you how to do all this today.

## What we're building

We will build a full stack application that will provide users with various subscription pricing plans and allow you to collect monthly payments from your customers with as few lines of code as possible. This is what our flow will look like:
We start with a basic checkout page for users to choose which plan they want to subscribe to.

![Product Offering](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fproducts.png?alt=media&token=9cd29987-4624-48ae-94f7-468fc5a51175)

Once they click the button, we route them to a [Stripe](https://stripe.com) Checkout Session where they input their credit card information.

![Checkout Page](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fcheckout-page.png?alt=media&token=49a6406f-2be8-4b18-ad99-a9821d73fd60)

Upon successful verification of their card, we route them to a page alerting them that their card was verified and their subscription will begin.

![Success Page](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fsuccess-page.png?alt=media&token=28a78197-9424-4d80-8329-d6916d805847)

Finally, if they do not complete the checkout process, we route them to another page alerting them they have not subscribed to the chosen plan.

![Cancel Page](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fcancel-page.png?alt=media&token=e3297e39-50b8-4613-abff-9da665c018dd)

### Assumptions

- You have an existing [React](https://reactjs.org) application.
- You have a backend express server running.
- You have a Stripe account.
- You’ve installed Stripe as a dependency in your React and express apps. If not, just run

```shell
npm install –save stripe
```

### Create your products from the Stripe dashboard

Stripe products define what your business is selling. In our case, we are selling subscription services. Prices define how much and how often to charge for your services and are attached to products. Stripe makes it very simple to create products from your dashboard. Just go to “Products” in the top navigation bar and then click “Add product” in the top right corner.

![Stripe Dashboard](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fstripe-dashboard.png?alt=media&token=65dfb885-334e-4e0f-be80-f483748445b3)

Input your product name, description, and tax code. Next, we’re going to give our product a price. Stripe has a lot of flexibility in how to charge your customers. We will charge our customers a flat $10 per month.

![Product Creation](https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blog%2Fimages%2Fstripe-subscriptions%2Fproduct.png?alt=media&token=9941c214-f1fb-479e-8515-34bdffef9231)

### Create your subscription endpoint

Next, we’re going to create the endpoint to begin our checkout process. My backend API is an Express application written in javascript.

```javascript
app.post('create-subscription', async (req, resp) => {
  const priceId = req.body.priceId
  const session = await stripe.cehckout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price,
        priceId,
      },
    ],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/canceled',
  })

  // Redurect to the URL returned by the Checkout Session
  return resp.send(session.url)
})
```

We start by retrieving the priceId of our product that we fetch on the front end. Then we create the checkout session. We set our mode to be a subscription. Our line items are the priceIds that the customer is purchasing. We use the priceId fetched from our product. The `success_url` we define is where our customer gets routed if their payment succeeds, and our `cancel_url` is where the customer will get routed if they cancel the session. We will need to create these pages in our front end app. Finally, we return the url of Stripe’s checkout page. Express does have a redirect function which redirects our front end application to the correct url.

```javascript
resp.redirect(303, session.url)
```

However, this always gives me CORS issues so I just manually pass the url to the front end and redirect to it via the Next router.

### Create your front end pages

Now to create the necessary front end pages. We will create 3 pages: checkout.js, success.js, and cancel.js.

`checkout.js`: the page to show the user the different subscription plans and ultimately redirect them to Stripe’s checkout page.

`success.js`: the page to show the user a confirmation of their subscription beginning.

`cancel.js`: the page to let the user know the session was canceled.
Before we create our checkout page, I always separate the code that interacts between the frontend and backend into a separate service script. Let’s create a stripe-service script.

```javascript
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

export function subscribe(priceId) {
  return axios.post('/create-subscription', { priceId: priceId })
}
```

All we do is connect to our backend server and return a promise that will resolve to the checkout URL.

React time.

Before we begin, some things to keep in mind:

- The styling will be extremely basic.
- The weird classNames is [Tailwind CSS](https://tailwindcss.com). If you have never used Tailwind, I would highly recommend it. It makes styling extremely quick and you no longer need to have separate CSS files.
- I am not showing the code to retrieve your products from Stripe. It is very straightforward and easy to implement and would make this blog post unnecessarily longer. Check out [this page](https://stripe.com/docs/api/products/list?lang=node) to learn how to retrieve your products in Node.js.

```javascript
return (
  <div className="flex flex-col justify-center items-center bg-blue-500 h-screen">
    {products.map((product) => (
      <div
        key={product.id}
        className="flex justify-evenly w-4/5 border-4 rounded px-4 py-8 items-center"
      >
        <p className="text-white font-semibold">{product.name}</p>
        <p className="text-white font-semibold">{product.description}</p>
        <button
          onClick={() => handleClick(product.priceId)}
          className="py-3 px-8 text-sm rounded-md bg-gray-100 hover:border-gray-400 
                            hover:bg-gray-200 focus:ring-2 focus:ring-gray-200"
        >
          <p className="font-bold">Subscribe</p>
        </button>
      </div>
    ))}
  </div>
)
```

Let’s start with what we render to the user. ```products``` is a list of dictionaries that have the product’s name, description, Stripe id, and price id. We loop through this list and display the necessary information to the user.

```javascript
const router = useRouter()

function handleClick(priceId) {
  subscribe(priceId).then((respUrl) => {
    router.push(respUrl.data)
  })
}
```

When the user clicks on our button, we call the function written in our earlier script. This function will return a promise with the correct Stripe checkout page URL to reroute to. We route to this link using Next Router.

Finally, you need to create your success and cancel pages. Again the code for mine is very minimal since these pages will depend on what exactly your application does. When I wrote Blankly’s team billing service, I did not even create separate pages but instead routed the user to the main checkout page with a URL query parameter and displayed a modal for whether their subscription had begun or if their session was canceled. But here is the React code for both pages:

```javascript
function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-green-500 h-screen">
      <p className="text-3xl font-bold py-8">
        You have successfully subscribed!
      </p>
      <button
        className="py-3 px-8 text-sm rounded-md bg-gray-100 hover:border-gray-400 
                            hover:bg-gray-200 focus:ring-2 focus:ring-gray-200"
      >
        <p className="font-bold">Return to Dashboard</p>
      </button>
    </div>
  )
}

export default SuccessPage
```

```javascript
function CancelPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-red-500 h-screen">
      <p className="text-3xl font-bold py-8">Checkout Process Abandoned</p>
      <button
        className="py-3 px-8 text-sm rounded-md bg-gray-100 hover:border-gray-400 
                            hover:bg-gray-200 focus:ring-2 focus:ring-gray-200"
      >
        <p className="font-bold">Retry</p>
      </button>
    </div>
  )
}

export default CancelPage
```

That is it! Stripe will charge the payment method your user entered monthly and send the payment to whatever banking method you entered when creating your Stripe account. I hope you enjoyed this tutorial, and check out [Blankly’s Platform](https://blankly.finance) to see how I implemented this service with a much sleeker looking front end for building better trading algorithms.

## Want to learn more?

If you're interested in learning more, [talk to us here @ Blankly](https://calendly.com/blankly) and check out our [open source package](https://package.blankly.finance). We'd love to chat! We're constantly in our [Discord](https://discord.gg/xJAjGEAXNS) too!