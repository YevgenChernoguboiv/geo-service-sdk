import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export const Header = ({ onRefresh, isLoading }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black">
      <h1 className="text-lg font-bold text-white">Wholesale Terminal</h1>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="p-2 rounded-lg hover:bg-gray-800 active:scale-95 transition-transform touch-manipulation disabled:opacity-50"
        aria-label="Refresh products"
      >
        <RefreshCw 
          size={18} 
          className={`text-gray-300 ${isLoading ? 'animate-spin' : ''}`}
        />
      </button>
    </header>
  );
};
