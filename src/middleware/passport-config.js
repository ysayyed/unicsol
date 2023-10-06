
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { config } from 'dotenv';
import { User } from '../schemas/User.js';
import passport from 'passport';
config()
var opts = {}
var cookieExtractor = function (req) {
	var token = null;
	if (req && req.cookies) {
		token = req.cookies['jwt'];
	}
	return token;
};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;


passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
	console.log(jwtPayload)
	User.findById(jwtPayload.id)
		.then(user => {
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
}));