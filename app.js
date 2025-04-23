const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync=require("./utils/wrapAsync.js");
const Review=require("./models/review.js");




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use('/uploads', express.static('public/uploads'));




//Database Connection-Start
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

// Database Connection compeleted


// listen Api
app.listen(8080,()=>{
    console.log("server is listning");
});

// Root Api
app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

// New Route
app.get("/listings/new",(req,res)=>{
    res.render("./listing/new.ejs");
})

//index route
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("./listing/index",{allListings});

}));




//Show Route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
 let {id}=req.params;
 const listing=await Listing.findById(id).populate("reviews");
 res.render("./listing/show",{listing});

}));

//create Route
app.post("/listings",wrapAsync(async(req,res,next)=>{
    let listing=req.body.listing;
    const newListing=new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
})
);

//Edit Route
app.get("/listings/:id/edit",wrapAsync( async(req,res)=>{
    let {id}=req.params;
 const listing=await Listing.findById(id);
 res.render("./listing/edit.ejs",{listing});
})
);

//Update Route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    // console.log("Received body:", req.body); 
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/Listings");
 
        // console.log("PUT request received!"); 
        // console.log("Received body:", req.body); 
}));

app.delete("/listings/:id",wrapAsync( async(req,res)=>{
let {id}=req.params;
await Listing.findByIdAndDelete(id);
res.redirect("/Listings");
}));






//review route
app.post("/listings/:id/reviews",async(req,res)=>{
  let listing=await Listing.findById(req.params.id);
  let newReview=new Review(req.body.review)
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
});







//  Last sections
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

//MiddleWare for validation 
app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"}=err;
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
});