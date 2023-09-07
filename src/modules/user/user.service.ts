import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  const result = await prisma.profile.create({
    data,
  });

  return result;
};

const getUsers = async () => {
  const using_prisma = await prisma.user.findMany({
    //by select we will fetch columns only-mongodb projection
    // select: {
    //   email: true,
    //   name: true
    // },
    //include another table data into result,-mongodb populate
    include: {
      profile: true,
    },
  });

  const result = await prisma.$queryRaw`select * from users`;
  return result;
};

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  insertOrUpdateProfile,
  getUsers,
  getSingleUser,
};
