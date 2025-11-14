export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-gray-500">
          © {new Date().getFullYear()} FPL-Onchain. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-gray-600">
          <a
            href="https://my.sportmonks.com/"
            className="hover:text-purple-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data: Sportmonks
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://www.theguardian.com/open-platform"
            className="hover:text-purple-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            News: The Guardian
          </a>
        </div>
      </div>
    </footer>
  );
};

