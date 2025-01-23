import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ActionCard({ card }) {
  const path = `../../../public/assets/${card.image}.jpeg`;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(card.url);
  };
  
  return (
    <Card className="group bg-gray-900/40 border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 text-white">
      <CardContent className="p-6">
        <div className={`rounded-lg overflow-hidden mb-4 bg-gradient-to-br`}>
          <img
            src={path}
            alt={card.title}
            width={250}
            height={150}
            className="w-full h-[150px] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <card.icon className="w-5 h-5" />
            <h3 className="font-semibold">{card.title}</h3>
          </div>
          <p className="text-sm text-gray-400">{card.description}</p>

          <Button
            variant="ghost"
            className="w-full group/button hover:bg-gray-800"
            onClick={handleClick}
          >
            <span>View More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}