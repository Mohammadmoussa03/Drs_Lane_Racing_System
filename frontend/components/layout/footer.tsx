'use client'

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-primary/20 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">DRS Racing</h3>
            <p className="text-sm text-muted">Elite motorsport racing platform for competitive drivers.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Races</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Championships</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Leaderboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Drivers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary/20 pt-8 text-center text-sm text-muted">
          <p>&copy; 2024 DRS Lane Racing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
