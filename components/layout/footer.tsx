import Link from "next/link";
import { Flag, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  racing: [
    { name: "Upcoming Races", href: "/races" },
    { name: "Championships", href: "/championships" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Book a Race", href: "/races?status=open" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Rules & Safety", href: "/rules" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "News", href: "/news" },
    { name: "Partners", href: "/partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center skew-button">
                <span className="text-xl font-bold text-white">D</span>
              </div>
              <span className="text-xl font-bold uppercase tracking-wider">
                DRS Lane
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional go-kart racing platform. Book races, track stats, compete in championships.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Racing</h4>
            <ul className="space-y-2">
              {footerLinks.racing.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DRS Lane Racing. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Flag className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Race. Compete. Dominate.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
