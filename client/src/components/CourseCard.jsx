import { Clock, Users, BookOpen, Star } from "lucide-react";

export function CourseCard({
  pic,
  title,
  coupon,
  org_price,
  platform,
  rating,
  duration,
}) {
  const handleImageClick = () => {
    window.location.href = coupon;
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-800 hover:border-gray-700">
      <div className="relative w-full pt-[56.25%]">
        <img
          src={pic}
          alt={`${title} course thumbnail`}
          className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
          onClick={handleImageClick}
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-400">{title}</h2>
        <p className="text-gray-400 mb-4">Platform: {platform}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-300">{duration}</span>
          </div>

          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-300">{org_price}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            <span className="text-gray-300">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}