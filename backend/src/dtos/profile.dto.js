import mongoose from "mongoose";
export class ProfileDTO {
  constructor(
    id,
    name,
    email,
    phone,
    profilePicture,
    department,
    profession,
    isActive
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.profilePicture = profilePicture;
    this.department = department;
    this.profession = profession;
    this.isActive = isActive;
  }
  static fromUser(user) {
    return new ProfileDTO(
      user._id,
      user.name,
      user.email,
      user.phone,
      user.profilePicture,
      user.department,
      user.profession,
      user.isActive
    );
  }
}
