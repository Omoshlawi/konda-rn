/**
 * Converts a nested object into FormData, handling Files and arrays.
 *
 * @param data - The object to convert to FormData
 * @param options - Configuration options
 * @param options.useIndexOnFiles - If true, uses array indices in keys for File objects
 * @param formData - Optional existing FormData to append to
 * @param parentKey - Used internally for recursive calls to maintain proper key hierarchy
 *
 * @returns FormData object containing all the data with proper key structure
 *
 * @example
 * const data = {
 *   name: 'John',
 *   files: [file1, file2],
 *   details: {
 *     age: 30,
 *     photo: fileObject
 *   }
 * };
 *
 * const formData = objectToFormData(data, { useIndexOnFiles: true });
 * // Results in FormData with keys like:
 * // - name
 * // - files[0], files[1]
 * // - details[age]
 * // - details[photo]
 */
export const objectToFormData = (
  data: { [key: string]: any },
  options: { useIndexOnFiles: boolean } = { useIndexOnFiles: false },
  formData: FormData = new FormData(),
  parentKey?: string
): FormData => {
  for (const key in data) {
    if (key in data) {
      const value = data[key];

      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value !== null && value !== undefined) {
        if (value instanceof Array) {
          value.forEach((val, index) => {
            const nestedFormKey = `${formKey}[${index}]`;

            if (typeof val === "object" && !(val instanceof File)) {
              // Recursively handle nested objects in arrays
              objectToFormData(val, options, formData, nestedFormKey);
            } else {
              // Handle File instances in arrays
              if (val instanceof File) {
                formData.append(
                  options.useIndexOnFiles ? nestedFormKey : formKey,
                  val,
                  val.name
                );
              } else {
                formData.append(nestedFormKey, val);
              }
            }
          });
        } else if (typeof value === "object" && !(value instanceof File)) {
          // Recursively handle nested objects
          objectToFormData(value, options, formData, formKey);
        } else if (value instanceof File) {
          // Handle top-level File instances
          formData.append(formKey, value, value.name);
        } else {
          formData.append(formKey, value as string);
        }
      }
    }
  }
  return formData;
};
