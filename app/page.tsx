import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import Section01 from "../components/sections/Section01";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Section01 />
      </main>
    </div>
  );
};

export default Home;
