// src/services/crudService.ts
import axiosInstance from '../utils/axiosManager';
import { Post } from '../types/post';
import logger from '../utils/loggerManager';

export const createPost = async (newPost: Post): Promise<Post> => {
    console.log("\nLog samples\n")
    logger.info('This is a success test');
    logger.warn('This is a warn test');
    logger.error('This is a error test');
    logger.debug('This is a silly test');
  try { 
    const response = await axiosInstance.post<Post>('/posts', newPost);
    logger.info('Post created successfully');
    return response.data;
  } catch (error) {
    logger.error('Error creating post:', error);
    throw error;
  }
};

export const getPost = async (id: number): Promise<Post> => {
  try {
    const response = await axiosInstance.get<Post>(`/posts/${id}`);
    logger.info(`Post with ID ${id} retrieved successfully`,);
    return response.data;
  } catch (error) {
    logger.error(`Error retrieving post with ID ${id}:`, error);
    throw error;
  }
};

export const updatePost = async (id: number, updatedPost: Post): Promise<Post> => {
  try {
    const response = await axiosInstance.put<Post>(`/posts/${id}`, updatedPost);
    logger.info(`Post with ID ${id} updated successfully`);
    return response.data;
  } catch (error) {
    logger.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/posts/${id}`);
    logger.info(`Post with ID ${id} deleted successfully`);
  } catch (error) {
    logger.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};
