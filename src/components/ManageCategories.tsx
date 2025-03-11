
import { useState } from "react";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash2, Plus, FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const COLOR_OPTIONS = [
  "#4f46e5", // indigo
  "#2563eb", // blue
  "#0891b2", // cyan
  "#10b981", // emerald
  "#84cc16", // lime
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#6b7280", // gray
];

const ManageCategories = () => {
  const { categories, addCategory, deleteCategory } = useBookmarks();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    await addCategory(newCategoryName, selectedColor);
    
    // Reset form
    setNewCategoryName("");
    setSelectedColor(COLOR_OPTIONS[0]);
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <FolderPlus className="h-4 w-4" />
            Manage Categories
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="flex-grow"
                />
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-10 h-10 p-0"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="flex flex-wrap gap-1 w-56">
                      {COLOR_OPTIONS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className="w-7 h-7 rounded-md border border-gray-200 cursor-pointer transition-all hover:scale-110"
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button type="submit" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="border-t pt-3">
              <h3 className="font-medium text-sm mb-2">Existing Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-md border border-gray-100 bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      <span>{category.name}</span>
                    </div>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" 
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete category</TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCategories;
