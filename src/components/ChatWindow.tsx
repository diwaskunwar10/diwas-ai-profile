
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MessageCircle, X } from "lucide-react";

export const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl"
        >
          <MessageCircle size={24} />
        </Button>
      ) : (
        <Card className="w-80 h-96 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Chat with Diwas</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center text-gray-500">
              This is a demo chat window.
              <br />
              No authentication required!
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-3 py-2 border rounded-md"
              disabled
            />
          </div>
        </Card>
      )}
    </div>
  );
};
