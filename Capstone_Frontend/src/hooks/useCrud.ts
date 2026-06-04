import { useEffect, useState } from "react";

interface UseCrudOptions<T> {
  getItems: () => Promise<T[]>;
  createItem?: (data: Partial<T>) => Promise<T>;
  updateItem?: (id: string, updates: Partial<T>) => Promise<T>;
  deleteItem?: (id: string) => Promise<unknown>;
}

export const useCrud = <T extends { _id: string }>({
  getItems,
  createItem,
  updateItem,
  deleteItem,
}: UseCrudOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch {
        setError("Unable to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [getItems]);

  const addItem = async (data: Partial<T>) => {
    if (!createItem) return;

    const newItem = await createItem(data);
    setItems((prevItems) => [newItem, ...prevItems]);

    return newItem;
  };

  const editItem = async (id: string, updates: Partial<T>) => {
    if (!updateItem) return;

    const updatedItem = await updateItem(id, updates);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? updatedItem : item
      )
    );

    return updatedItem;
  };

  const removeItem = async (id: string) => {
    if (!deleteItem) return;

    await deleteItem(id);

    setItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  return {
    items,
    setItems,
    isLoading,
    error,
    setError,
    addItem,
    editItem,
    removeItem,
  };
};