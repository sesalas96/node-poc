import { Router, Request, Response } from 'express';
import { createPost, getPost, updatePost, deletePost } from '../services/postsService';
import { Post } from '../types/post';

const router = Router();

const ejecutarCRUD = async () => {
  try {
    // Crear un nuevo usuario
    const newPost: Post = {
      title: 'New Axios Post',
      body: 'This is a post created with Axios and TypeScript',
      userId: 1
    };
    await createPost(newPost);

    // Fetch the post by ID
    await getPost(1);

    // Update the post
    const updatedPost: Post = {
      title: 'Updated Axios Post 2121212',
      body: 'This is an updated post with Axios and TypeScript',
      userId: 1
    };
    await updatePost(1, updatedPost);

    // Delete the post
    await deletePost(1);
  } catch (error) {
    console.error('Error al ejecutar el CRUD', error);
  }
};

router.get('/', async (req: Request, res: Response) => {
  await ejecutarCRUD();
  res.send('Fin !');
});

export default router;
