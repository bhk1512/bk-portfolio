import ScrollProgress from "./(components)/ui/ScrollProgress";
import Nav from "./(components)/nav/Nav";
import Hero from "./(sections)/Hero";
import WorkPatterns from "./(sections)/WorkPatterns";
import Projects from "./(sections)/Projects";
import DesignPhilosophy from "./(sections)/DesignPhilosophy";
import Impact from "./(sections)/Impact";
import Skills from "./(sections)/Skills";
import Certifications from "./(sections)/Certifications";
import About from "./(sections)/About";
import Contact from "./(sections)/Contact";

export default function PortfolioApp() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-[#E0E0E0] scroll-smooth overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main className="pt-10">
        <Hero />
        <WorkPatterns />
        <Projects />
        <DesignPhilosophy />
        <Impact />
        <Skills />
        <Certifications />
        <About />
        <Contact />
      </main>
    </div>
  );
}
