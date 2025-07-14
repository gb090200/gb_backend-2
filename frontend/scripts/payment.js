function payNow() {
  const email = document.getElementById("email").value;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, id) => sum + courses[id].price, 0);

  const options = {
    key: "rzp_test_NPutTVSRS6ATAe",
    amount: total * 100,
    currency: "INR",
    name: "GB Academy",
    description: "Course Purchase",
    handler: function (response) {
      fetch("https://gb-backend-1.onrender.com/send-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          payment_id: response.razorpay_payment_id,
          courses: cart
        })
      }).then(res => res.text()).then(() => {
        alert("PDFs sent to your email");
        localStorage.clear();
      });
    },
    prefill: { email }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}
