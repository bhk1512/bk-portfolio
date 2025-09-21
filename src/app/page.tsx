import ScrollProgress from "./(components)/ui/ScrollProgress";
import Nav from "./(components)/nav/Nav";
import Hero from "./(sections)/Hero";
import Projects from "./(sections)/Projects";
import Impact from "./(sections)/Impact";
import Skills from "./(sections)/Skills";
import Certifications from "./(sections)/Certifications";
import About from "./(sections)/About";
import Writing from "./(sections)/Writing";
import Contact from "./(sections)/Contact";

export default function PortfolioApp() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-[#E0E0E0] scroll-smooth overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main className="pt-10">
        <Hero />
        <Projects />
        <Impact />
        <Skills />
        <Certifications />
        <About />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}