type Props = {
  value: string;
  number: number;
};

export default function FormatComponentForAdditionalInfo({ value, number }: Props) {
  if (value === 'sunrise' || value === 'sunset')
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  return number;
}
