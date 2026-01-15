import Card from '../Cards/Card';
import { Skeleton } from '../ui/skeleton';

type Props = {};

export default function AdditionalSkeleton({}: Props) {
  return (
    <Card title="Additional Weather Info" childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <span>
            <Skeleton className="size-8" />
          </span>
        </div>
      ))}
    </Card>
  );
}
