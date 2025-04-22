const getRoleStyles = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-green-100 text-green-700";
      case "leader":
        return "bg-discord-light/20 text-discord"; 
      case "member":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

export {getRoleStyles}