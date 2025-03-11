
import { useBookmarks } from "@/contexts/BookmarkContext";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import ManageCategories from "@/components/ManageCategories";
import { Bookmark } from "lucide-react";

const ExtensionPopup = () => {
  const { loading } = useBookmarks();

  return (
    <div className="w-[360px] h-[600px] p-4 bg-white overflow-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-blue-600" />
          <h1 className="text-lg font-semibold">Bookmark Bundle</h1>
        </div>
        <ManageCategories />
      </div>
      
      <div className="space-y-4">
        <AddBookmarkForm />
        
        <div>
          <h2 className="text-sm font-medium mb-2">Your Bookmarks</h2>
          <BookmarkList />
        </div>
      </div>
    </div>
  );
};

export default ExtensionPopup;
