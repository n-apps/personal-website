export function Footer() {
  return (
    <footer className="border-t border-mt-border/40 pt-8 pb-12">
      <div className="flex flex-col gap-3 text-xs leading-relaxed text-mt-text-secondary">
        <p>
          Built by{' '}
          <a
            href="https://romamakes.com/"
            data-goatcounter-click="missing-tracks-footer-portfolio"
            className="text-mt-text transition-colors duration-150 hover:text-mt-green"
            target="_blank"
            rel="noreferrer"
          >
            Roma
          </a>
        </p>
        <p>
          An experimental side project. Your watchlist is stored only in this
          browser, so nothing leaves your device. Not affiliated with Spotify
          AB.
        </p>
      </div>
    </footer>
  );
}
