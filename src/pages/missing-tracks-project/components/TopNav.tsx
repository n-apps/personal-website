import { Link, NavLink } from 'react-router';
import { cn } from '../lib/cn';

const HOME_PATH = '/missing-tracks-project/';
const ABOUT_PATH = '/missing-tracks-project/about/';

const navLink = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex h-10 items-center rounded-mt-pill px-2 text-sm font-semibold transition-colors duration-150 md:text-base',
    isActive ? 'text-mt-text' : 'text-mt-text-secondary hover:text-mt-text',
  );

export function TopNav() {
  return (
    <header className='relative z-10 w-full px-4 pt-4 sm:px-6 md:px-8 md:pt-6'>
      <div className='mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 rounded-[28px] bg-[oklch(1_0_0/0.01)] px-5 ring-1 ring-white/15 backdrop-blur-[98px] sm:px-7 md:h-[72px] md:px-9'>
        <Link
          to={HOME_PATH}
          aria-label='missing from Spotify — home'
          className='min-w-0 shrink'
          data-goatcounter-click='missing-tracks-nav-wordmark'>
          <span
            className='block truncate text-lg text-mt-text md:text-xl'
            style={{ fontFamily: "'Madimi One', sans-serif" }}>
            missing from Spotify <span className='text-mt-green'>(((</span>
          </span>
        </Link>

        <nav
          aria-label='Primary'
          className='flex shrink-0 items-center gap-2 md:gap-5'>
          <NavLink
            to={HOME_PATH}
            end
            className={navLink}
            data-goatcounter-click='missing-tracks-nav-home'>
            Home
          </NavLink>
          <NavLink
            to={ABOUT_PATH}
            className={navLink}
            data-goatcounter-click='missing-tracks-nav-about'>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
