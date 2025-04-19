'use client'

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/react';

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

import {
  Vr,
  Person,
  People
} from 'react-bootstrap-icons';

const products = [
  { name: 'Bet Analysis', description: 'Moneyline, Spread, and Over/Under', href: '/analysis', icon: Vr },
  { name: 'Saved Bets', description: 'Past bet analysis computations', href: '/savedbets', icon: ArchiveBoxIcon},
  { name: 'Players', description: 'Gain insight on performances of your favorite players.', href: '/players', icon: Person },
  { name: 'Teams', description: 'Build knowledge on competing teams.', href: '/teams', icon: People }
];

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (

    <header className="fixed top-0 left-0 z-20 text-nowrap w-full bg-white/30 backdrop-blur-lg shadow-sm">
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6" aria-label="Global">
        {/* Logo */}
        <div className="flex sm:flex-1">
          <a href="/" className="flex items-center">
            <p className="sr-only">Betting Analysis</p>
            <Image
              width={40}
              height={40}
              src="/logo.png"
              priority
              unoptimized
              alt="Ideal Strategies Logo"
              className="h-11 max-h-12 w-auto"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Nav */}
        {isClient && (
          <PopoverGroup className="hidden sm:flex sm:gap-x-8">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-md text-white hover:text-gray-400">
                Betting Odds Analysis
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-white" />
              </PopoverButton>

              <PopoverPanel className="absolute top-full z-10 mt-2 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-700 ring-1 shadow-lg ring-white/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="relative flex items-start gap-x-6 rounded-lg p-4 text-sm transition-all duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-black" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block text-white">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-white">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href="/information" className="text-md text-white hidden xl:block hover:text-gray-400">Sports Book Information</a>
            <a href="/helpline" className="text-md text-white hidden xl:block hover:text-gray-400">Gambling Helpline</a>
            <a href="/contact" className="text-md text-white hidden xl:block hover:text-gray-400">Contact</a>
          </PopoverGroup>
        )}

        {session ? (
          <div className="hidden sm:flex sm:items-center sm:space-x-4 sm:flex-1 sm:justify-end">
            <div className="flex items-center space-x-2 bg-black/60 px-3 py-1 rounded-lg shadow-sm border border-gray-700">
              <img
                src={session.user?.image || ''}
                alt="Profile"
                className="h-8 w-8 rounded-full border border-gray-300 shadow-sm"
              />
              <span className="text-sm text-white font-medium truncate max-w-[120px]">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex sm:flex-1 sm:justify-end">
            <button
              onClick={() => signIn('google')}
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg transition"
            >
              Log in
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Panel */}
      {isClient && (
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="sm:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Betting Analysis</span>
                <img alt="Ideal Bet Logo" src="/logo.svg" className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2.5 text-gray-700 hover:bg-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base text-gray-900 hover:bg-gray-50">
                      Betting Analysis
                      <ChevronDownIcon aria-hidden="true" className="h-5 w-5 group-data-open:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {products.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>

                  <a href="/information" className="-mx-3 block rounded-lg px-3 py-2 text-base text-gray-900 hover:bg-gray-50">Sports Book Information</a>
                  <a href="/helpline" className="-mx-3 block rounded-lg px-3 py-2 text-base text-gray-900 hover:bg-gray-50">Gambling Helpline</a>
                </div>

                <div className="py-6">
                  <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base text-gray-900 hover:bg-gray-50">Log in</a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </header>
  );
}
