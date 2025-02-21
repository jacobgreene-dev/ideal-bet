'use client'

import { useState } from 'react';
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
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { 
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
import {
  Vr,
  DistributeVertical, 
  GraphUp,
  Person,
  People
} from 'react-bootstrap-icons';

const products = [
  { name: 'Money Line Bet', description: 'Predict which of your favorite teams will win.', href: '#', icon: Vr },
  { name: 'Over/Under Bet', description: 'Estimate whether the total score will exceed or fall short.', href: '#', icon: DistributeVertical },
  { name: 'Spread Bet', description: 'Determine if a team will win or lose by a margin.', href: '#', icon: GraphUp },
  { name: 'Players', description: 'Gain insight on performances of your favorite players.', href: '#', icon: Person },
  { name: 'Teams', description: 'Build knowledge on competing teams.', href: '#', icon: People },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-neutral-900 relative z-20 text-nowrap">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex sm:flex-1 mr-6">
          <a href="/" className="flex items-center">
            <p className="sr-only">Betting Analysis</p>
            <Image
              width={40} 
              height={40} 
              src="/logo.png"
              priority
              unoptimized
              alt="Ideal Strategies Logo"
              objectFit="contain"
              className="h-11 max-h-12 w-auto"
            />
          </a>
        </div>
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
        <PopoverGroup className="hidden sm:flex sm:gap-x-8">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-white">
              Betting Odds Analysis
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-white" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-sky-700 ring-1 shadow-lg ring-white/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-start gap-x-6 rounded-lg p-4 text-sm hover:bg-neutral-800"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-black" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-white">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-white break-words">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="/information" className="text-sm font-semibold text-white">
            Sports Book Information
          </a>
          <a href="/history" className="text-sm font-semibold text-white">
            Betting History
          </a>
          <a href="/helpline" className="text-sm font-semibold text-white hidden xl:block">
            Gambling Helpline
          </a>
          <a href="/contact" className="text-sm font-semibold text-white hidden xl:block">
            Contact
          </a>
        </PopoverGroup>
        <div className="hidden sm:flex sm:flex-1 sm:justify-end">
          <a href="#" className="text-sm font-semibold text-white p-1 bg-black m-1 rounded-lg">
            Log in <span aria-hidden="true"></span>
          </a>
          <a href="#" className="text-sm font-semibold text-black p-1 bg-sky-500 m-1 rounded-lg">
            Register <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="sm:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Betting Analysis</span>
              <img
                alt="Ideal Bet Logo"
                src="/logo.svg"
                className="h-8 w-auto"
              />
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
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Betting Analysis
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="/information"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Sports Book Information
                </a>
                <a
                  href="/history"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Betting History
                </a>
                <a
                  href="/helpline"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Gambling Helpline
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}