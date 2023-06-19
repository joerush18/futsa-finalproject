interface IPlayers {
  id: string;
  userId: string;
  fullname: string;
  address: {
    city: string;
    street: string;
  };
  contactNumber: number;
  profilePicture: string;
  points: number;
}

export { IPlayers };
