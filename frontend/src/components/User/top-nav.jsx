"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "../mode-toggle"

export default function TopNav() {
  const location = useLocation()

  const generateBreadcrumbs = () => {
    const segments = location.pathname.split("/").filter(Boolean)
    return segments.map((segment, index) => ({
      label: decodeURIComponent(segment),
      href: "/" + segments.slice(0, index + 1).join("/")
    }))
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          Home
        </Link>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <div key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
              {isLast ? (
                <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
              ) : (
                <Link
                  to={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <img
              src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
