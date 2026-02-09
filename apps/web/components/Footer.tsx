import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-carbon border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-bold tracking-wider">
                APEX<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting the future of performance. Every curve engineered for speed,
              every detail designed for perfection.
            </p>
          </div>

          {/* Models */}
          <div>
            <h4 className="font-display text-lg mb-4">Models</h4>
            <ul className="space-y-2">
              <li><Link href="/models" className="text-muted-foreground hover:text-primary transition-colors text-sm">Phantom GT</Link></li>
              <li><Link href="/models" className="text-muted-foreground hover:text-primary transition-colors text-sm">Inferno RS</Link></li>
              <li><Link href="/models" className="text-muted-foreground hover:text-primary transition-colors text-sm">Spectre</Link></li>
              <li><Link href="/models" className="text-muted-foreground hover:text-primary transition-colors text-sm">Venom Track</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/customize" className="text-muted-foreground hover:text-primary transition-colors text-sm">Configure</Link></li>
              <li><Link href="/test-drive" className="text-muted-foreground hover:text-primary transition-colors text-sm">Test Drive</Link></li>
              <li><span className="text-muted-foreground text-sm">Financing</span></li>
              <li><span className="text-muted-foreground text-sm">Service Centers</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+1 (800) APEX-CAR</li>
              <li>contact@apexmotors.com</li>
              <li className="pt-4">
                <div className="flex space-x-4">
                  <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">YouTube</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">X</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 APEX Motors. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;