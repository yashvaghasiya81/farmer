import { MainNav } from "./main-nav";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main>{children}</main>
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                FarmFresh
              </h3>
              <p className="mt-4 text-sm text-gray-500">
                Supporting local farmers and providing fresh produce since 2025.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-400">
              © 2025 FarmFresh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
