import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { consentCopy as copy } from "@/content/consent";

import { ConsentProvider } from "./consent-provider";
import { CookieBanner } from "./cookie-banner";
import { CookieSettingsButton } from "./cookie-settings-button";

function clearCookies() {
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0]!.trim();
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  }
}

function renderBanner() {
  return render(
    <ConsentProvider>
      <CookieBanner copy={copy} />
      <CookieSettingsButton label={copy.footerButton} />
    </ConsentProvider>,
  );
}

const banner = () =>
  screen.queryByRole("region", { name: /Cookies and analytics|Cookie settings/ });

beforeEach(clearCookies);
afterEach(() => {
  clearCookies();
  Object.defineProperty(navigator, "globalPrivacyControl", {
    value: undefined,
    configurable: true,
  });
});

describe("cookie banner", () => {
  it("asks on the first visit with two equal choices", () => {
    renderBanner();
    expect(banner()).toHaveAccessibleName(copy.notice.title);
    const accept = screen.getByRole("button", { name: "Accept" });
    const decline = screen.getByRole("button", { name: "Decline" });
    expect(accept.className).toBe(decline.className);
    expect(screen.getByRole("link", { name: copy.notice.policy.label })).toHaveAttribute(
      "href",
      "/cookies",
    );
  });

  it("does not steal focus on the first visit", () => {
    renderBanner();
    expect(document.activeElement).toBe(document.body);
  });

  it.each([
    ["Accept", "v1.granted"],
    ["Decline", "v1.denied"],
  ])("%s stores the choice and closes", (button, value) => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: button }));
    expect(document.cookie).toContain(`bx_consent=${value}`);
    expect(banner()).toBeNull();
  });

  it("stays closed when a choice is stored", () => {
    document.cookie = "bx_consent=v1.denied; Path=/";
    renderBanner();
    expect(banner()).toBeNull();
  });

  it("treats Global Privacy Control as a decline and does not ask", () => {
    Object.defineProperty(navigator, "globalPrivacyControl", { value: true, configurable: true });
    renderBanner();
    expect(banner()).toBeNull();
    expect(document.cookie).not.toContain("bx_consent");
  });

  it("settings: the footer button reopens it with the current choice, and focus returns", () => {
    document.cookie = "bx_consent=v1.granted; Path=/";
    renderBanner();
    const opener = screen.getByRole("button", { name: copy.footerButton });
    opener.focus();
    fireEvent.click(opener);

    expect(banner()).toHaveAccessibleName(copy.settings.title);
    expect(screen.getByText(copy.settings.title, { selector: "p" })).toHaveFocus();
    const toggle = screen.getByRole("switch", { name: copy.settings.analytics.name });
    expect(toggle).toBeChecked();
    expect(screen.getByText(copy.settings.essential.status)).toBeInTheDocument();

    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("button", { name: copy.settings.save }));
    expect(document.cookie).toContain("bx_consent=v1.denied");
    expect(banner()).toBeNull();
    expect(opener).toHaveFocus();
  });

  it("settings: Escape and Cancel close without changing the choice", () => {
    document.cookie = "bx_consent=v1.granted; Path=/";
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: copy.footerButton }));
    fireEvent.click(screen.getByRole("switch"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(banner()).toBeNull();
    expect(document.cookie).toContain("bx_consent=v1.granted");

    fireEvent.click(screen.getByRole("button", { name: copy.footerButton }));
    fireEvent.click(screen.getByRole("button", { name: copy.settings.cancel }));
    expect(banner()).toBeNull();
  });

  it("opens the settings from a clicked #cookie-settings link and returns focus to it", () => {
    document.cookie = "bx_consent=v1.denied; Path=/";
    render(
      <ConsentProvider>
        <CookieBanner copy={copy} />
        <a href="#cookie-settings">Change cookie choice</a>
      </ConsentProvider>,
    );
    const link = screen.getByRole("link", { name: "Change cookie choice" });
    link.focus();
    fireEvent.click(link);
    expect(banner()).toHaveAccessibleName(copy.settings.title);
    fireEvent.click(screen.getByRole("button", { name: copy.settings.cancel }));
    expect(link).toHaveFocus();
  });

  it("opens the settings from a #cookie-settings hash change", () => {
    document.cookie = "bx_consent=v1.denied; Path=/";
    renderBanner();
    act(() => {
      window.location.hash = "#cookie-settings";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(banner()).toHaveAccessibleName(copy.settings.title);
  });
});
