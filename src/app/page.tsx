import ScrollProgress from "./(components)/ui/ScrollProgress";
import Nav from "./(components)/nav/Nav";
import Hero from "./(sections)/Hero";
import Work from "./(sections)/Work";
import OnTheRecord from "./(sections)/OnTheRecord";
import Contact from "./(sections)/Contact";

export default function PortfolioApp() {
  return (
    <div className="bg-ground min-h-screen text-body scroll-smooth overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Work />
        <OnTheRecord />
      </main>
      <Contact />
    </div>
  );
}
