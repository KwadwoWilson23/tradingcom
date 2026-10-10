import Link from 'next/link';
import { Trophy, Zap, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">Traders Ring</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600">How It Works</Link>
            <Link href="/leaderboard" className="text-sm font-medium text-slate-600 hover:text-blue-600">Leaderboard</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/join">
              <Button variant="primary">Join Competition</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 flex-1">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Compete. Trade. <span className="text-blue-600">Win.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Connect your MT4/MT5 account and prove your skills in real-time trading competitions. Stand out on the leaderboard and win exclusive prizes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/join">
              <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-6 h-auto">Join Competition</Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 h-auto">View Leaderboard</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Everything you need to compete at the highest level with absolute transparency.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Leaderboard</h3>
              <p className="text-slate-600 text-sm">Real-time standings updated instantly with every closed trade.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Sync</h3>
              <p className="text-slate-600 text-sm">Direct integration with MT4/MT5 servers for sub-second trade tracking.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Connection</h3>
              <p className="text-slate-600 text-sm">Your credentials are encrypted and never stored in plain text.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Weekly Competitions</h3>
              <p className="text-slate-600 text-sm">New chances to win every week with diverse rulesets and prize pools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center max-w-xs">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">1</div>
              <h3 className="font-semibold text-lg mb-2">Choose Competition</h3>
              <p className="text-slate-600 text-sm text-center">Pick a live or upcoming trading competition without creating an account first.</p>
            </div>
            <div className="hidden md:block w-16 h-px bg-slate-300 mt-8"></div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">2</div>
              <h3 className="font-semibold text-lg mb-2">Connect Account</h3>
              <p className="text-slate-600 text-sm text-center">Link your MT4/MT5 account securely via investor password.</p>
            </div>
            <div className="hidden md:block w-16 h-px bg-slate-300 mt-8"></div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">3</div>
              <h3 className="font-semibold text-lg mb-2">Compete & Win</h3>
              <p className="text-slate-600 text-sm text-center">Trade normally and climb the ranks to earn prizes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Trophy className="h-5 w-5 text-slate-400" />
            <span className="font-semibold text-slate-700">Traders Ring</span>
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-900">Terms</Link>
            <Link href="#" className="hover:text-slate-900">Privacy</Link>
            <Link href="#" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
