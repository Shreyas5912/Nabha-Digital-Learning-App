"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'hi', name: 'हिंदी' }
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  
  const currentLanguage = languages.find(lang => lang.code === language)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 text-green-600 border-green-600 hover:bg-green-50">
          <span>{currentLanguage?.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className="flex items-center space-x-2"
          >
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}