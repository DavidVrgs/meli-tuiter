export const saveInStorage = <TData>(key: string, data: TData) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteItemOfArrayInStorage = <TData>(
  key: string,
  index: number,
  currentData: Array<TData>
) => {
  const newArray = [...currentData];
  newArray.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(newArray));
  return newArray;
};
