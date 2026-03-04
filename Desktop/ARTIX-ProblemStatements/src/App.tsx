import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Zap, Users, Clock, Trophy, Star, ChevronDown, Menu, X, ArrowRight, Sparkles, Target, Lightbulb, Rocket } from 'lucide-react';
import { ProblemCard } from './components/ProblemCard';
import { ProblemModal } from './components/ProblemModal';
import { problemStatements } from './data/problems';
import detailedProblems from './data/problemsDetailed.json';

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Team Lead",
    avatar: "👨‍💻",
    skills: ["React", "TypeScript", "System Design"],
    experience: "5 years",
    bio: "Full-stack developer with expertise in scalable web applications"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    avatar: "👩‍🎨",
    skills: ["Figma", "Animation", "Mobile Design"],
    experience: "4 years",
    bio: "Creative designer focused on user-centered mobile experiences"
  },
  {
    id: 3,
    name: "Mike Williams",
    role: "Backend Developer",
    avatar: "👨‍💻",
    skills: ["Node.js", "Python", "Cloud Architecture"],
    experience: "3 years",
    bio: "Backend specialist with strong database and API development skills"
  }
];

const features = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized performance for all devices",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "User Focused",
    description: "Designed with mobile-first approach",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovative",
    description: "Cutting-edge animations and interactions",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Modern UI",
    description: "Beautiful and intuitive interface",
    color: "from-orange-500 to-red-500"
  }
];
const domains = [
  'All',
  'Insurance',
  'HR',
  'Hospitality',
  'Healthcare',
  'Food Industry',
  'Finance',
  'Education',
  'Airport/Lounge',
  'Digital Footprint & PII Analysis',
  'Tracking & Investigative Tools',
  'Privacy & Compliance Automation',
  'Employment & JobTech Automation',
  'FinTech / GovTech / Graph AI',
  'Hardware'
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'problems'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProblemClick = (problemId: number) => {
    const problem = detailedProblems.find(p => p.id === problemId);
    if (problem) {
      setSelectedProblem(problem);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProblem(null);
  };

  const filteredProblems = useMemo(() => {
    let filtered = problemStatements;

    if (selectedDomain !== 'All') {
      filtered = filtered.filter(p => p.domain === selectedDomain);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.skills.toLowerCase().includes(query) ||
        p.domain.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedDomain]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce-in mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-48 mx-auto skeleton rounded-lg"></div>
            <div className="h-4 w-32 mx-auto skeleton rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src="/artix-logo.jpeg" alt="ARTIX Logo" className="w-8 h-8 rounded-full" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                ARTIX-2026
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Problems'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item === 'Home' ? 'hero' : item.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => window.location.href = 'https://artix-iota.vercel.app/'}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
              >
                Register Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {['Home', 'Problems'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item === 'Home' ? 'hero' : item.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => window.location.href = 'https://artix-iota.vercel.app/'}
                className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
              >
                Register Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slideUp">
            <p className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 px-2 bg-gradient-to-r from-purple-600 via-green-600 to-pink-600 bg-clip-text text-transparent">
              IOT-esSENCE Presents
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              81 cutting-edge challenges across 14 domains. Build innovative agent-based solutions and transform ideas into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 md:mb-12 px-2">
              <button
                onClick={() => {
                  const element = document.getElementById('problems');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover-lift text-sm sm:text-base"
              >
                Explore Challenges
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => window.location.href = 'https://artix-iota.vercel.app/'}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover-lift border-2 border-blue-600 text-sm sm:text-base"
              >
                Register Now
              </button>
            </div>
            
            <div className="animate-float">
              <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Trophy, value: '81', label: 'Challenges', color: 'from-blue-500 to-blue-600' },
              { icon: Filter, value: '14', label: 'Domains', color: 'from-cyan-500 to-cyan-600' },
              { icon: Users, value: '3', label: 'Team Size', color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group hover-lift animate-scaleIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-16 md:py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Problem <span className="gradient-text">Statements</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of challenges across various domains
            </p>
          </div>
          <div className="mb-8 space-y-4 animate-fadeIn">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problem statements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white shadow-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600 font-medium">
                Showing {filteredProblems.length} of {problemStatements.length} problem statements
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 pb-2 overflow-x-auto">
              {domains.map(domain => {
                const count = domain === 'All' ? problemStatements.length : problemStatements.filter(p => p.domain === domain).length;
                return (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      selectedDomain === domain
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {domain} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredProblems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 animate-bounce-in">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem, index) => (
                <div
                  key={problem.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProblemCard
                    id={problem.id}
                    domain={problem.domain}
                    title={problem.title}
                    description={problem.description}
                    skills={problem.skills}
                    isInternship={problem.is_internship}
                    onClick={() => handleProblemClick(problem.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    ARTIX-2026
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4 max-w-md">
                  Innovation Challenge by Department of IoT, MREC. Building tomorrow's solutions today.
                </p>
                <div className="flex space-x-4">
                  {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                    >
                      <span className="text-xs">{social[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Quick Info</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>81 Problem Statements</li>
                  <li>14 Technical Domains</li>
                  <li>Innovation Challenge Event</li>
                  <li>3 Members per Team</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <p className="text-sm text-gray-400">
                  Malla Reddy Engineering College<br />
                  Department of IoT<br />
                  Hyderabad, Telangana
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-400">
                  © 2026 ARTIX • Department of IoT, MREC • All rights reserved
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</button>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">Terms</button>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Problem Modal */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default App;
