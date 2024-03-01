import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useUserPreference } from "@/store/userPreference";



const ToogleTheme = () : JSX.Element => {
  const [theme, setTheme] = useUserPreference(state => [state.theme ,state.setTheme])
  
  useEffect(() => {
    const setRootTheme = (color: string): void => {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(color);
    };

    const handleThemeChange = (e: MediaQueryListEvent): void => {
      setRootTheme(e.matches ? 'dark' : 'light')
    };

    const themeSystem = window.matchMedia('(prefers-color-scheme: dark)');

    if (theme === 'system') {
      themeSystem.addEventListener('change', handleThemeChange)
      setRootTheme(themeSystem.matches ? 'dark' : 'light')
    } else {
      themeSystem.removeEventListener('change', handleThemeChange)
      setRootTheme(theme);
    }

    return () => {
      themeSystem.removeEventListener('change', handleThemeChange)
    };

  }, [theme]);

  return (
    <div className="ml-auto" >
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="focus-visible:ring-transparent" variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => { setTheme(value)}}>
          <DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Oscuro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default ToogleTheme