

var stripe = Stripe('pk_test_ADZYyadH5WHU5RAzn65H8cKi00smalRXZm');


const bookrest=async(restname)=>{

    try{
        const session=await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${restname}`);

        await stripe.redirectToCheckout({
            sessionId:session.data.session.id
        });
    }
    catch(err){
console.log(err);
    }
}

const bookbtn=document.getElementById('book-tour');

if(bookbtn){

    bookbtn.addEventListener('click',e=>{
        e.target.textContent='Processing...';
        const {tourId}=e.target.dataset;
        bookrest(tourId);
    })
}