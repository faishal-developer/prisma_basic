import { Post, PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      user: true,
      category: true,
    },
  });
  return result;
};

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, limit = 10, page = 1 } = options;
  const skip = (page - 1) * limit;
  const take = Number(limit);

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      //pagination will be done by skip and take-limit
      skip,
      take,
      include: {
        user: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: [sortOrder],
            }
          : { createdAt: "asc" },
      where: {
        // for single field
        //   title: {
        //     contains: searchTerm,
        //     mode: "insensitive",
        //   },

        // for multiple field , we can use AND,NOT also instead of OR
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            user: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await tx.post.count();
    return { data: result, total };
  });
};

const updatePost = async (id: number, payload: Partial<Post>) => {
  const using_prisma = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });

  const result = await prisma.$executeRaw`
    update post set title=${payload.title} where id=${id}
  `;
  return result;
};
const deletePost = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return result;
};

const learnAggregateAndGrouping = async () => {
  //aggregation
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  //   _sum: {
  //     authorId: true,
  //   },
  // });

  //grouping
  const result = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });
  return result;
};

export const postService = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};
