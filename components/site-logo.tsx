export function SiteLogo() {
  return (
    <div className="flex items-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#000" />
        <path d="M8 8H24V12H8V8Z" fill="white" />
        <path d="M8 14H20V18H8V14Z" fill="white" />
        <path d="M8 20H16V24H8V20Z" fill="white" />
      </svg>
      <span className="ml-2 font-bold text-xl text-black dark:text-white">SiteForge</span>
    </div>
  )
}
