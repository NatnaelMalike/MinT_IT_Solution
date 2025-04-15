"use client";

import {
  Building2,
  Menu,

} from "lucide-react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar({navItems}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  const isActive = (href) => pathname == href;

  return (
    <>
      <Button
        variant={"outline"}
        className="lg:hidden fixed top-4 left-4 z-[70] rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64  transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r
                ${isMobileMenuOpen ? "translate-x-0 bg-sidebar" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex  flex-col">
          <Link
            href="https://www.mint.gov.et/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b"
          >
            <div className="flex items-center gap-3">
              <Building2 />
              <span className="text-lg font-semibold hover:cursor-pointer">
                MinT
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider">
                  Overview
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={handleNavigation}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                          active
                            ? "bg-accent "
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 mr-3 flex-shrink-0",
                            active && "text-primary"
                          )}
                        />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0   z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
