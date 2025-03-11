
import { useState } from "react";
import { useBookmarks } from "@/contexts/BookmarkContext";
import BookmarkItem from "./BookmarkItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const BookmarkList = () => {
  const { bookmarks, categories, loading } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      bookmark.title.toLowerCase().includes(term) ||
      bookmark.url.toLowerCase().includes(term)
    );
  });

  const getCategoryBookmarks = (categoryId: string) => {
    return filteredBookmarks.filter((bookmark) => bookmark.categoryId === categoryId);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading bookmarks...
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>No bookmarks saved yet.</p>
        <p className="text-sm">Use the form above to save your first bookmark!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex-1"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-2">
          <ScrollArea className="h-64">
            <div className="space-y-2 pr-4">
              {filteredBookmarks.length === 0 ? (
                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  No bookmarks match your search.
                </div>
              ) : (
                filteredBookmarks.map((bookmark) => (
                  <BookmarkItem 
                    key={bookmark.id} 
                    bookmark={bookmark} 
                    category={categories.find(c => c.id === bookmark.categoryId)}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-2">
            <ScrollArea className="h-64">
              <div className="space-y-2 pr-4">
                {getCategoryBookmarks(category.id).length === 0 ? (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    No bookmarks in this category.
                  </div>
                ) : (
                  getCategoryBookmarks(category.id).map((bookmark) => (
                    <BookmarkItem 
                      key={bookmark.id} 
                      bookmark={bookmark} 
                      category={category}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BookmarkList;
