require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const payment = require("./routes/payment");

const app = express();

app.use(express.json())
app.use(
	cookieSession({
		name: "session",
		keys: ["auth"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.use("/api/payment/", payment);
app.get('/',async(req,res)=>{
	res.send("helloo")
})

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000",
		failureRedirect: "/login/failed",
	})
);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
