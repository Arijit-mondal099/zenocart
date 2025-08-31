import { Link } from "react-router-dom";
import { thumble } from "../../assets";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <div className="relative overflow-hidden group">
      <img
        src={thumble}
        alt="hero"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover rounded-lg"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase mb-6 leading-tight">
            <Typewriter
              words={[
                "Vacation Vibes",
                "Shop Bold",
                "Feel Fresh",
                "Live Stylish",
                "Own the Look",
                "New Arrivals",
                "Trend Alert",
                "Style Drop",
                "Look Sharp",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="."
              typeSpeed={140}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          </h1>

          <p className="max-w-3xl text-sm tracking-tight md:text-lg mb-8 mx-auto">
            Discover trend-forward outfits, curated collections, and bold
            essentials designed for every getaway. Shop now for exclusive drops,
            easy returns, and global delivery.
          </p>

          <Link
            to={"/collections/all"}
            className="px-10 py-3 text-sm md:text-lg rounded-lg bg-white text-black uppercase font-bold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
