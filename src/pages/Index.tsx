
import { useEffect } from 'react';
import { Bookmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Bookmark className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Bookmark Bundle</CardTitle>
          <CardDescription>
            Chrome Extension for Bookmark Management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-amber-50 p-4 border border-amber-200 text-amber-800">
            <h3 className="font-medium mb-1">This is a Chrome Extension</h3>
            <p className="text-sm">
              This application is designed to be used as a Chrome browser extension. 
              To use it, please load it into Chrome as an unpacked extension.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">How to install:</h3>
            <ol className="list-decimal ml-5 text-sm space-y-1">
              <li>Go to Chrome's extension page (chrome://extensions/)</li>
              <li>Enable "Developer mode" in the top-right corner</li>
              <li>Click "Load unpacked" and select this project's build folder</li>
              <li>The extension icon will appear in your browser toolbar</li>
            </ol>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>Created with Lovable</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
