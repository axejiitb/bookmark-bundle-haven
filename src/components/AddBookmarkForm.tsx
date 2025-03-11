
import { useState, useEffect } from "react";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkPlus } from "lucide-react";

const AddBookmarkForm = () => {
  const { categories, addBookmark, getCurrentTab } = useBookmarks();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCurrentTab = async () => {
      const tab = await getCurrentTab();
      if (tab) {
        setUrl(tab.url || "");
        setTitle(tab.title || "");
        // Set to default category if available
        if (categories.length > 0 && !categoryId) {
          setCategoryId(categories[0].id);
        }
      }
    };

    loadCurrentTab();
  }, [categories, getCurrentTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url || !title || !categoryId) return;
    
    setLoading(true);
    try {
      await addBookmark(url, title, categoryId);
      // Reset form after successful add
      // setUrl("");
      // setTitle("");
    } catch (error) {
      console.error("Error adding bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-sm border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <BookmarkPlus className="h-4 w-4" />
          Save Current Page
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              required
              className="text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              type="url"
              required
              className="text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Select
              value={categoryId}
              onValueChange={setCategoryId}
              required
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={loading || !url || !title || !categoryId}
            className="w-full"
          >
            {loading ? "Saving..." : "Save Bookmark"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddBookmarkForm;
