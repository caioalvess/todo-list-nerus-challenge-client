import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function TodoFilterInput() {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar tarefas..."
          //   value={searchQuery}
          //   onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
        />
      </div>
    </div>
  );
}
