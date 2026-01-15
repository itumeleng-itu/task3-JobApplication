import profileIcon from '../../public/profile-icon.png';

export default function ProfileOverview() {
  return (
    <a 
      href="/addDetails"
      className="bg-gray-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[280px] hover:bg-gray-300 transition-colors cursor-pointer"
    >
      {/* User Icon */}
      <img 
        src={profileIcon} 
        alt="Profile" 
        className="w-32 h-32 object-cover rounded-lg mb-4"
      />
      <p className="text-black font-semibold text-xl">Profile overview</p>
    </a>
  );
}
