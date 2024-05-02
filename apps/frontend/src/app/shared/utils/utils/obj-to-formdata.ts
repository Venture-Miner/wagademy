export const ObjToFormData = (obj: Record<string, any>) => {
  const formData: FormData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof Date) {
      value = value.toISOString();
    }
    formData.append(key, value);
  });
  return formData;
};
