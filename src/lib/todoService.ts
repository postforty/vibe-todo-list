import { supabase } from './supabase';

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
}

export const todoService = {
  async getTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Todo[];
  },

  async addTodo(title: string, userId: string) {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, user_id: userId }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Todo;
  },

  async toggleTodo(id: string, isCompleted: boolean) {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_completed: isCompleted })
      .match({ id })
      .select()
      .single();
    
    if (error) throw error;
    return data as Todo;
  },

  async deleteTodo(id: string) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .match({ id });
    
    if (error) throw error;
  }
};
