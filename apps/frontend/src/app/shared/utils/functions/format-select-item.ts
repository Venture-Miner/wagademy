import { SelectItem } from '../../components/select/select.component';
import { formatEnumKeys } from './format-enum';

export function formatSelectItem<T extends string>(
  enumInput: Record<string, T>
): SelectItem<T>[] {
  return [
    ...Object.values(enumInput).map((type) => {
      return { value: type, label: formatEnumKeys(type) as string };
    }),
  ];
}
