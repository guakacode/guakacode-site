import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  // Apply dark mode on initial load
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      setIsScrolled(scrollTop > 50)
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 100) // Trigger 100px before bottom
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md py-2' 
          : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-4'
      }`}>
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div 
            className={`flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollToTop()
              }
            }}
          >
            <img src="/logo.png" alt="Guakacode Logo" className={`transition-all duration-300 ${
              isScrolled ? 'h-8' : 'h-10'
            } w-auto rounded-lg`} />
          </div>

          {/* Nav links */}
          <ul className={`hidden md:flex space-x-8 font-semibold text-gray-800 dark:text-white transition-all duration-300 ${
            isScrolled ? 'space-x-6' : 'space-x-8'
          }`}>
            <li>
              <a href="#services" className="hover:text-brand transition-all duration-300 hover:scale-110 relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-brand transition-all duration-300 hover:scale-110 relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-brand transition-all duration-300 hover:scale-110 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-brand transition-all duration-300 hover:scale-110 relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-brand transition-all duration-300 hover:scale-110 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`border border-brand text-brand hover:bg-brand hover:text-white rounded transition-all duration-300 hover:scale-110 active:scale-95 focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
              isScrolled ? 'px-2 py-1 text-sm' : 'px-3 py-1'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="text-center py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url(${darkMode ? '/assets/hero-dark.png' : '/assets/hero-light.png'})`
        }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/30 transition-colors duration-500"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full floating-element"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/20 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/20 rounded-full floating-element" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white/20 rounded-full floating-element" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-brand mb-4 animate-title-glow drop-shadow-lg font-black">GuakaCode</h1>
          <p className="mt-2 text-lg md:text-xl text-white animate-slide-up drop-shadow-md font-semibold">BuildCode: Crafting Innovative App Solutions</p>
          <p className="mt-4 text-sm text-white animate-slide-up-delay drop-shadow-sm font-medium">– “From one stone to many, the house rises.”</p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white/80 text-xs font-medium animate-scroll-pulse writing-mode-vertical">explore</span>
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-scroll-indicator"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-5 w-12 h-12 bg-brand/10 rounded-full floating-element"></div>
          <div className="absolute top-32 right-8 w-8 h-8 bg-brand/10 rounded-full floating-element" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-16 left-1/3 w-16 h-16 bg-brand/10 rounded-full floating-element" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-32 right-1/4 w-10 h-10 bg-brand/10 rounded-full floating-element" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-14 h-14 bg-brand/10 rounded-full floating-element" style={{animationDelay: '2.5s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/30 transition-colors duration-300 pulse-element">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand group-hover:text-brand/80 transition-colors duration-300">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">Modern, responsive websites built with cutting-edge technologies.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/30 transition-colors duration-300 pulse-element" style={{animationDelay: '0.5s'}}>
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand group-hover:text-brand/80 transition-colors duration-300">Mobile Apps</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">Native and cross-platform mobile applications for iOS and Android.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/30 transition-colors duration-300 pulse-element" style={{animationDelay: '1s'}}>
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand group-hover:text-brand/80 transition-colors duration-300">Custom Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">Tailored software solutions to meet your specific business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-8 right-12 w-20 h-20 bg-brand/10 rounded-full floating-element"></div>
          <div className="absolute top-40 left-8 w-12 h-12 bg-brand/10 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-brand/10 rounded-full floating-element" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-10 h-10 bg-brand/10 rounded-full floating-element" style={{animationDelay: '3.5s'}}></div>
          <div className="absolute top-1/3 right-1/6 w-14 h-14 bg-brand/10 rounded-full floating-element" style={{animationDelay: '0.8s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-gray-200 dark:border-gray-700">
              <div className="w-full h-32 bg-gradient-to-br from-brand/20 to-brand/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-brand/30 group-hover:to-brand/20 transition-all duration-300">
                <span className="text-4xl">🛒</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand group-hover:text-brand/80 transition-colors duration-300">E-Commerce Platform</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">Full-stack e-commerce solution with payment integration.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-gray-200 dark:border-gray-700">
              <div className="w-full h-32 bg-gradient-to-br from-brand/20 to-brand/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-brand/30 group-hover:to-brand/20 transition-all duration-300">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand group-hover:text-brand/80 transition-colors duration-300">Task Management App</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">Cross-platform mobile app for team collaboration.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group border border-gray-200 dark:border-gray-700">
              <div className="w-full h-32 bg-gradient-to-br from-brand/20 to-brand/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-brand/30 group-hover:to-brand/20 transition-all duration-300">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand group-hover:text-brand/80 transition-colors duration-300">Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">Real-time data visualization and reporting system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-12 w-18 h-18 bg-brand/10 rounded-full floating-element"></div>
          <div className="absolute top-1/2 right-16 w-14 h-14 bg-brand/10 rounded-full floating-element" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute bottom-24 left-1/3 w-12 h-12 bg-brand/10 rounded-full floating-element" style={{animationDelay: '2.8s'}}></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-brand/10 rounded-full floating-element" style={{animationDelay: '0.7s'}}></div>
        </div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">About GuakaCode</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          “Guaka” is a term inspired by the Kenyan Kikuyu language, meaning "to construct" or "to build".
           It reflects our philosophy of crafting code with the same care and precision as laying each stone in a foundation. 
           At GuakaCode, we blend cultural heritage with software craftsmanship,
            creating solutions that are structurally sound, purpose driven, and deeply meaningful.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-12 left-8 w-16 h-16 bg-brand/10 rounded-full floating-element"></div>
          <div className="absolute top-36 right-10 w-10 h-10 bg-brand/10 rounded-full floating-element" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute bottom-16 left-1/5 w-14 h-14 bg-brand/10 rounded-full floating-element" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute bottom-36 right-1/5 w-18 h-18 bg-brand/10 rounded-full floating-element" style={{animationDelay: '3.2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-brand/10 rounded-full floating-element" style={{animationDelay: '0.9s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Latest Insights</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Coming Soon: Read insights, tutorials, and updates from our development team.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-16 w-14 h-14 bg-brand/10 rounded-full floating-element"></div>
          <div className="absolute top-44 right-12 w-10 h-10 bg-brand/10 rounded-full floating-element" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-brand/10 rounded-full floating-element" style={{animationDelay: '2.6s'}}></div>
          <div className="absolute bottom-44 right-1/4 w-12 h-12 bg-brand/10 rounded-full floating-element" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-1/3 left-1/3 w-18 h-18 bg-brand/10 rounded-full floating-element" style={{animationDelay: '3.6s'}}></div>
        </div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className={`text-center py-10 bg-gray-800 dark:bg-gray-900 text-white relative overflow-hidden transition-all duration-1000 ${
        isAtBottom ? 'animate-footer-reveal' : 'opacity-0 translate-y-10'
      }`}>
        {/* Floating elements in footer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-10 left-20 w-16 h-16 bg-white/10 rounded-full floating-element"></div>
          <div className="absolute top-10 right-20 w-12 h-12 bg-white/10 rounded-full floating-element" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-lg font-semibold mb-2">GuakaCode</p>
          <p className="text-xs text-gray-400 italic">– One step at a time builds the house.</p>
          <p className="text-sm text-gray-300 mb-2">© 2025 GuakaCode. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
