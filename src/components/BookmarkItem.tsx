
import { Bookmark, Category } from "@/services/bookmarkService";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BookmarkItemProps {
  bookmark: Bookmark;
  category: Category | undefined;
}

const BookmarkItem = ({ bookmark, category }: BookmarkItemProps) => {
  const { deleteBookmark } = useBookmarks();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    await deleteBookmark(bookmark.id);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const openUrl = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: bookmark.url });
    } else {
      window.open(bookmark.url, '_blank');
    }
  };

  return (
    <div 
      className="flex items-center p-3 rounded-md bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all gap-3 group cursor-pointer"
      onClick={openUrl}
    >
      <div className="flex-shrink-0">
        {bookmark.favicon ? (
          <img 
            src={bookmark.favicon} 
            alt="" 
            className="w-6 h-6 rounded" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm text-gray-800 truncate">{bookmark.title}</h3>
          {category && (
            <span 
              className="text-xs px-2 py-0.5 rounded-full" 
              style={{ 
                backgroundColor: `${category.color}20`, 
                color: category.color 
              }}
            >
              {category.name}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{bookmark.url}</p>
        <p className="text-xs text-gray-400 mt-1">{formatDate(bookmark.createdAt)}</p>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openUrl();
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open link</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" 
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete bookmark</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default BookmarkItem;
