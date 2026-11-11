"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";

import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type { getNavigation } from "@/lib/content";
import { activeNavKey } from "@/lib/nav";

import { Logo } from "./logo";

type Navigation = ReturnType<typeof getNavigation>;

const MEGA_ID = "bx-mega-menu";
const MOBILE_ID = "bx-mobile-nav";
const COMPANY_ID = "bx-company-menu";

const navLink =
  "relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3.5 py-3 text-[15px] font-normal transition-colors hover:bg-deep-panel hover:text-on-deep-accent";

function ActiveUnderline() {
  return (
    <span aria-hidden="true" className="absolute right-3.5 bottom-1 left-3.5 h-0.5 bg-brand-cyan" />
  );
}

/**
 * Sticky site header (BxHeader.dc.html): 72px on phones, 84px from 900px, logo, nav, CTA. Navy bar with the white
 * logo (owner decision 2026-11-06, the design has it white); the menus are navy too, styled like the footer (2026-11-09).
 * ≥900px: Services opens a mega menu and Company a small menu on hover or focus; each closes on
 * header mouse-leave,
 * hovering or focusing another item, Escape, or focus leaving the header.
 * <900px: a Menu button toggles a full-width panel with focus trap and scroll lock.
 */
export function Header({ nav }: { nav: Navigation }) {
  const pathname = usePathname();
  const active = activeNavKey(pathname);
  // Which desktop dropdown is open: the Services mega menu or the Company menu.
  const [openMenu, setOpenMenu] = useState<"services" | "company" | null>(null);
  const megaOpen = openMenu === "services";
  const companyOpen = openMenu === "company";
  const [menuOpen, setMenuOpen] = useState(false);
  // Which service group is expanded in the mobile panel (one at a time).
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLAnchorElement>(null);
  const companyRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // Set while Escape returns focus to a menu trigger, so that focus does not reopen the menu.
  const returningFocus = useRef(false);
  const openMega = () => setOpenMenu("services");
  const openCompany = () => setOpenMenu("company");
  const onTriggerFocus = (menu: "services" | "company") => () => {
    if (returningFocus.current) {
      returningFocus.current = false;
      return;
    }
    setOpenMenu(menu);
  };
  /** Closes whichever desktop dropdown is open. */
  const closeMega = () => setOpenMenu(null);
  const closeAll = () => {
    setOpenMenu(null);
    setMenuOpen(false);
    setMobileGroup(null);
  };

  // Escape closes whichever menu is open and returns focus to its trigger.
  useEffect(() => {
    if (!openMenu && !menuOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) {
        const trigger = openMenu === "services" ? servicesRef.current : companyRef.current;
        setOpenMenu(null);
        if (headerRef.current?.contains(document.activeElement)) {
          returningFocus.current = true;
          trigger?.focus();
          returningFocus.current = false;
        }
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, menuOpen]);

  // Mobile panel: lock page scroll while open; close it if the viewport grows past 900px.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 900px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => {
      root.style.overflow = previous;
      wide.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  // Close the dropdowns when focus leaves the header.
  const onHeaderBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
  };

  // Focus trap inside the mobile menu (menu button + panel links and group toggles).
  // Links inside a collapsed group are hidden, so they are left out.
  const onHeaderKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!menuOpen || e.key !== "Tab") return;
    const focusables = [
      menuButtonRef.current,
      ...Array.from(
        mobilePanelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      ).filter((el) => !el.closest("[hidden]")),
    ].filter((el): el is HTMLElement => el !== null);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const servicesHighlighted = active === "services" || megaOpen;

  return (
    // Delegated handlers: mouse-leave, focus-out and Tab trapping for the menus inside.
    // The interactive elements themselves are native links and buttons.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <header
      ref={headerRef}
      onMouseLeave={closeMega}
      onBlur={onHeaderBlur}
      onKeyDown={onHeaderKeyDown}
      data-tone="deep"
      className="sticky top-0 z-30 border-b border-deep-hairline bg-deep font-ui"
    >
      <div className="mx-auto flex h-(--header-height) max-w-wide items-center gap-8 px-(--gutter)">
        <Logo tone="deep" placement="header" priority onClick={closeAll} />

        {/* Desktop navigation (≥900px) */}
        <nav aria-label="Main" className="ml-auto hidden nav:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                ref={servicesRef}
                href="/services"
                onMouseEnter={openMega}
                onFocus={onTriggerFocus("services")}
                onClick={closeAll}
                aria-expanded={megaOpen}
                aria-controls={MEGA_ID}
                aria-current={active === "services" ? "page" : undefined}
                className={cn(
                  navLink,
                  servicesHighlighted ? "text-on-deep-accent" : "text-on-deep",
                )}
              >
                Services
                <ChevronDownIcon />
                {active === "services" && <ActiveUnderline />}
              </Link>

              {/* Mega menu: in DOM order right after Services so keyboard users tab into it */}
              <div
                id={MEGA_ID}
                hidden={!megaOpen}
                data-tone="deep"
                className="absolute top-full right-0 left-0 max-h-[calc(100dvh-var(--header-height)-1px)] overflow-y-auto border-y border-deep-hairline bg-deep shadow-card"
              >
                <div className="mx-auto grid max-w-wide grid-cols-3 gap-x-4 gap-y-6 px-(--gutter) py-8 2xl:grid-cols-6">
                  {nav.megaMenu.groups.map((group) => (
                    // Subgrid rows keep every column's links level, even if a title wraps.
                    <div key={group.title} className="row-span-2 grid grid-rows-subgrid gap-y-1">
                      <Eyebrow as="span" tone="deep" className="mb-2 tracking-[0.06em]">
                        {group.title}
                      </Eyebrow>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={closeAll}
                              className="flex min-h-11 items-center text-small whitespace-nowrap text-on-deep transition-colors hover:text-on-deep-accent"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="border-t border-deep-hairline bg-deep-panel">
                  <div className="mx-auto flex max-w-wide flex-wrap items-center gap-x-6 gap-y-1 px-(--gutter) py-2">
                    <Link
                      href="/services"
                      onClick={closeAll}
                      className="inline-flex min-h-11 items-center gap-2 text-small font-normal text-on-deep-accent transition-colors hover:text-on-deep"
                    >
                      All services <ArrowRightIcon size={16} />
                    </Link>
                    {nav.megaMenu.footerLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeAll}
                        className="inline-flex min-h-11 items-center text-small text-on-deep transition-colors hover:text-on-deep-accent"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {nav.mainNav.map((item) =>
              item.key === "company" ? (
                <li key={item.key} className="relative">
                  <Link
                    ref={companyRef}
                    href={item.href}
                    onMouseEnter={openCompany}
                    onFocus={onTriggerFocus("company")}
                    onClick={closeAll}
                    aria-expanded={companyOpen}
                    aria-controls={COMPANY_ID}
                    aria-current={active === item.key ? "page" : undefined}
                    className={cn(
                      navLink,
                      active === item.key || companyOpen ? "text-on-deep-accent" : "text-on-deep",
                    )}
                  >
                    {item.label}
                    <ChevronDownIcon />
                    {active === item.key && <ActiveUnderline />}
                  </Link>

                  {/* Company menu: right after its trigger so keyboard users tab into it.
                      It hangs from the bottom edge of the header bar (link centre + half the bar). */}
                  <div
                    id={COMPANY_ID}
                    hidden={!companyOpen}
                    data-tone="deep"
                    className="absolute top-[calc(50%_+_var(--header-height)_/_2)] left-0 w-max min-w-[220px] rounded-b-lg border border-deep-hairline bg-deep p-2 shadow-card"
                  >
                    <ul>
                      {nav.companyMenu.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeAll}
                            aria-current={pathname === link.href ? "page" : undefined}
                            className="flex min-h-11 items-center rounded-md px-4 text-small text-on-deep transition-colors hover:bg-deep-panel hover:text-on-deep-accent"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onMouseEnter={closeMega}
                    onFocus={closeMega}
                    onClick={closeAll}
                    aria-current={active === item.key ? "page" : undefined}
                    className={cn(navLink, "text-on-deep")}
                  >
                    {item.label}
                    {active === item.key && <ActiveUnderline />}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Wrapper controls visibility: the button's own inline-flex would override `hidden`. */}
        <div className="hidden nav:block">
          <Link
            href={nav.headerCta.href}
            onMouseEnter={closeMega}
            onFocus={closeMega}
            onClick={closeAll}
            className={buttonClasses({ size: "header" })}
          >
            {nav.headerCta.label}
          </Link>
        </div>

        {/* Mobile menu button (<900px) */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_ID}
          className="ml-auto h-11 min-w-11 rounded-md border border-deep-border px-4 text-[15px] font-medium text-on-deep transition-colors hover:bg-deep-panel nav:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id={MOBILE_ID}
        ref={mobilePanelRef}
        hidden={!menuOpen}
        data-tone="deep"
        className="max-h-[calc(100dvh-var(--header-height)-1px)] overflow-y-auto border-t border-deep-hairline bg-deep px-4 pt-2 pb-6 nav:hidden"
      >
        <nav aria-label="Main" className="flex flex-col gap-4">
          <ul>
            {[
              { key: "services" as const, label: "Services", href: "/services" },
              ...nav.mainNav,
            ].map((item) => (
              <li key={item.key} className="border-b border-deep-hairline">
                <Link
                  href={item.href}
                  onClick={closeAll}
                  aria-current={active === item.key ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between text-[17px] font-normal text-on-deep"
                >
                  {item.label}
                  <ArrowRightIcon size={16} className="text-on-deep-muted" />
                </Link>
                {item.key === "services" && (
                  <ul className="-mt-2 pb-3 pl-4">
                    {nav.megaMenu.groups.map((group, index) => {
                      const expanded = mobileGroup === group.title;
                      const panelId = `bx-mobile-group-${index}`;
                      return (
                        <li key={group.title}>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-controls={panelId}
                            onClick={() => setMobileGroup(expanded ? null : group.title)}
                            className="flex min-h-11 w-full items-center justify-between text-left text-[15px] font-normal text-on-deep transition-colors hover:text-on-deep-accent"
                          >
                            {group.title}
                            <ChevronDownIcon
                              size={16}
                              className={cn("text-on-deep-muted", expanded && "rotate-180")}
                            />
                          </button>
                          <ul id={panelId} hidden={!expanded} className="pb-2 pl-4">
                            {group.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  onClick={closeAll}
                                  className="flex min-h-11 items-center text-[15px] text-on-deep-muted transition-colors hover:text-on-deep"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {item.key === "company" && (
                  <ul className="-mt-2 pb-3 pl-4">
                    {nav.companyMenu.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className="flex min-h-11 items-center text-[15px] text-on-deep-muted transition-colors hover:text-on-deep"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={nav.headerCta.href}
            onClick={closeAll}
            className={buttonClasses({ size: "block" })}
          >
            {nav.headerCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
