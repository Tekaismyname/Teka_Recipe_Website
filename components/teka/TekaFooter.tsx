"use client"

import { Youtube, Twitter } from "lucide-react"

export default function TekaFooter() {
  return (
    <footer className="bg-[#F4D03F] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 md:mb-0">
            <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#D2691E] rounded-full relative">
                <div className="absolute top-1 left-1 w-3 h-3 bg-[#F4D03F] rounded-full"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Teka</h2>
          </div>

          {/* Social Connect */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Social Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Youtube className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">Youtube.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Twitter className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">twitter.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="h-5 w-5 bg-gray-700 rounded"></div>
                <span className="text-gray-700 font-medium">google.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
